# 🤖 NotebookLM-Style RAG Application (Gemini + Qdrant)

A powerful, production-ready Retrieval-Augmented Generation (RAG) system that allows you to "chat" with your PDF and Text documents. Built with a modern tech stack focusing on speed, accuracy, and free-tier accessibility.

## ✨ Features
- **Modern UI**: Clean, aesthetic interface for document uploads and chat interaction.
- **Gemini AI Integration**: Uses Google's Gemini 1.5 Flash for high-speed, intelligent responses.
- **Smart Chunking**: Implements `RecursiveCharacterTextSplitter` to maintain semantic context.
- **Vector Search**: Powered by **Qdrant** for lightning-fast document retrieval.
- **Strict Grounding**: The AI only answers based on your documents—no hallucinations.
- **CLI Mode**: Includes a terminal-based interface for automated processing.

---

## 🏗️ Technical Architecture
- **Frontend**: Vanilla HTML5, CSS3 (Modern UI), and JavaScript.
- **Backend**: Node.js & Express.
- **LLM**: Google Gemini 1.5 Flash.
- **Embeddings**: Google Gemini `text-embedding-004` (768 dimensions).
- **Vector DB**: Qdrant (Running via Docker or Cloud).
- **Processing**: Multer (Uploads), PDF-Parse (Extraction), LangChain (Orchestration).

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher.
- **Docker Desktop**: To run the Qdrant database.
- **Gemini API Key**: Get one for free from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Database Setup (Docker)
Start the Qdrant vector database:
```bash
docker run -p 6333:6333 -p 6334:6334 -v qdrant_storage:/qdrant/storage:z qdrant/qdrant
```

### 3. Installation
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### 4. Configuration
Create a `.env` file in the `backend/` directory:
```env
GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
QDRANT_URL="http://127.0.0.1:6333"
PORT=3000
```

### 5. Run the App
```bash
node index.js
```
Visit **http://localhost:3000** to start chatting!

---

## 📁 Project Structure
- `/backend`: Express server, RAG logic, and API routes.
- `/frontend`: The web interface.
- `/backend/rag`: Core logic for chunking, embedding, and retrieval.
- `index.js`: Main entry point.

---

## 🛡️ License
Distributed under the MIT License.
