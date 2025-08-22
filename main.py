from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_chroma import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings

app = Flask(__name__)
# Allow all origins
CORS(app, resources={r"/*": {"origins": "*"}})

books = pd.read_csv(f"eth.csv")
books["Description"].to_csv("tagged_description.txt",
                                   sep = "\n",
                                   index = False,
                                   header = False)

raw_documents = TextLoader("tagged_description.txt", encoding='utf-8').load()
text_splitter = CharacterTextSplitter(chunk_size=1, chunk_overlap=0, separator="\n")
documents = text_splitter.split_documents(raw_documents)

# embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
embedding_function = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db_books = Chroma.from_documents(
    documents,
    embedding=embedding_function
)

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
@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    print(data)
    text = data.get('text', '')
    x = retrieve_semantic_recommendations(text)
    recommendations = {"Name": x['Name'].tolist(),
                    #   "Map": x['Map'].tolist(),
                      "Image": x['Image'].tolist(),
                      "Description": x['Description'].tolist(),
                      "Link": x['Link'].tolist(),
                    #   "Tag": x['Tag'].tolist()
                      }
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)



