# Visit Ethiopia Recommender

Welcome to the Visit Ethiopia Recommender! This is a full-stack AI-powered application designed to provide personalized recommendations for tourist attractions in Ethiopia. The platform leverages a state-of-the-art machine learning model to analyze user preferences and suggest the best places to visit, from ancient historical sites to stunning natural landscapes.

## 💻 Tech Stack

- **Frontend**: **Next.js**
- **Backend**: **Flask**

- **Personalized Recommendations**: Get suggestions based on your interests and preferences.

## 🚀 Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [Python](https://www.python.org/downloads/) (version 3.8 or later)
- `npm` or `yarn` for the frontend
- `pip` for the backend

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Mikilezen/visitethiopia-recommender.git](https://github.com/Mikilezen/visitethiopia-recommender.git)
    cd visitethiopia-recommender
    ```

2.  **Set up the Backend (Flask):**
    
    Navigate to the root directory and create a Python virtual environment.
    ```bash
    python -m venv env
    .\env\Scripts\activate  # On Windows
    source env/bin/activate # On macOS/Linux
    ```
    Install the required Python packages.
    ```bash
    pip install -r requirements.txt
    ```

3.  **Set up the Frontend (Next.js):**
    
    Navigate to the `frontend` directory and install the dependencies.
    ```bash
    cd frontend
    npm install
    ```

### Running the Application

1.  **Start the Flask Backend:**
    
    From the root directory of the project, run the main Python application.
    ```bash
    python main.py
    ```
    The backend server will run on `http://127.0.0.1:5000`.

2.  **Start the Next.js Frontend:**
    
    Open a **new terminal**, navigate to the `frontend` directory, and start the development server.
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.
