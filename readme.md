💬 ChatVerse - React Native Chat App

A React Native chat app with real-time messaging and an AI assistant.

🚀 Features

Real-time user chat with other app users (Appwrite-powered)

AI assistant for intelligent conversations

Document upload (PDF/TXT) for AI analysis

🛠️ Tech Stack

Frontend:

React Native (Expo)

Appwrite for messaging

Backend:

FastAPI + Uvicorn

MongoDB for AI chat storage

Ollama for AI model

PyPDF2 for PDF processing

📋 Installation
Backend Setup

Create requirements.txt:

fastapi==0.104.1
uvicorn==0.24.0
pymongo==4.6.0
python-dotenv==1.0.0
langchain-ollama==0.1.0
langchain-core==0.1.0
pypdf2==3.0.1


Install dependencies:

pip install -r requirements.txt


Create .env file:

MONGODB_URI=your_mongodb_uri
MONGODB_DB_NAME=chat_db


Run backend:

uvicorn main:app --reload --host 0.0.0.0 --port 8000


Make sure your mobile device is on the same network as your PC to access the backend.

Frontend Setup
npm install


Create .env file:

EXPO_PUBLIC_BACKEND_URL=http://your-pc-ip:8000
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_url
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id


Replace your-pc-ip with your PC’s local IP (e.g., 192.168.137.15) that is accessible by your mobile device.

🚀 Run App
# Backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend
npx expo start

🔌 Backend API
Endpoint	Method	Description
/ask-llm	POST	Chat with AI
/ask-llm-doc	POST	Upload document to AI
/get-chats	POST	Fetch AI chat history
📁 Project Structure

Backend:

main.py – FastAPI backend

database.py – MongoDB connection

models.py – Pydantic schemas

requirements.txt – Python dependencies

Frontend:

app/(chat)/ – Chat screens

contexts/ChatContext.js – Chat logic

lib/appwrite.js – Appwrite config

🔧 Requirements

Appwrite instance running

MongoDB database

Ollama AI model installed

Python 3.8+ for backend

Node.js for frontend

💡 Notes

Make sure your PC and mobile are on the same LAN to access the backend.

FastAPI CORS is configured for localhost:3000 by default; update as needed if using different frontend origin.