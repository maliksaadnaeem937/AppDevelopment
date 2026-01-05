# 💬 ChatVerse - React Native Chat App

A React Native chat app with real-time messaging and AI assistant.

## 🚀 Features

- **Real-time user chat** with other app users
- **AI assistant** for intelligent conversations
- **Document upload** (PDF/TXT) for AI analysis

## 🛠️ Tech Stack

**Frontend:**
- React Native (Expo)
- Appwrite for messaging

**Backend (FastAPI):**
- FastAPI + Uvicorn
- MongoDB for AI chat storage
- Ollama for AI
- PyPDF2 for PDF processing

## 📋 Installation

### Backend Setup:

```bash
# Create requirements.txt with:
fastapi==0.104.1
uvicorn==0.24.0
pymongo==4.6.0
python-dotenv==1.0.0
langchain-ollama==0.1.0
langchain-core==0.1.0
pypdf2==3.0.1

# Install dependencies:
pip install -r requirements.txt

# Create .env file:
MONGODB_URI=your_mongodb_uri
MONGODB_DB_NAME=chat_db
```

### Frontend Setup:

```bash
npm install
# .env file:
EXPO_PUBLIC_BACKEND_URL=http://your-ip:8000
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_url
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

## 🚀 Run App

```bash
# Backend:
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend:
npx expo start
```

## 🔌 Backend API

- `POST /ask-llm` - Chat with AI
- `POST /ask-llm-doc` - Upload document to AI
- `POST /get-chats` - Get AI chat history

## 📁 Files

**Backend:**
- `main.py` - FastAPI app
- `database.py` - MongoDB connection
- `models.py` - Pydantic schemas
- `requirements.txt` - Python dependencies

**Frontend:**
- `app/(chat)/` - Chat screens
- `contexts/ChatContext.js` - Chat logic
- `lib/appwrite.js` - Appwrite config

## 🔧 Requirements

1. **Appwrite** instance running
2. **MongoDB** database
3. **Ollama** with AI model
4. **Python 3.8+** for backend
5. **Node.js** for backend