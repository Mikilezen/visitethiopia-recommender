import pandas as pd
import warnings
warnings.filterwarnings("ignore")
books = pd.read_csv(f"eth.csv")
books["Description"].to_csv("tagged_description.txt",
                                   sep = "\n",
                                   index = False,
                                   header = False)
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_chroma import Chroma
raw_documents = TextLoader("tagged_description.txt").load()
text_splitter = CharacterTextSplitter(chunk_size=1, chunk_overlap=0, separator="\n")
documents = text_splitter.split_documents(raw_documents)
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_chroma import Chroma

# Create an embedding function using the SentenceTransformer model
embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# Create the Chroma database
db_books = Chroma.from_documents(
    documents,
    embedding=embedding_function
)
query = "in near addis abeba and more cretive"
docs = db_books.similarity_search(query, k = 10)


def retrieve_semantic_recommendations(
        query: str,
        top_k: int = 10,
) -> pd.DataFrame:
    recs = db_books.similarity_search(query, k = top_k)

    recommended_books = []
    for rec in recs:
        matching_book = books[books["Description"] == rec.page_content]
        if not matching_book.empty:
            recommended_books.append(matching_book.iloc[0])

    return pd.DataFrame(recommended_books)
retrieve_semantic_recommendations("oromia")