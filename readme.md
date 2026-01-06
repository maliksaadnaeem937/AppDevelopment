Got it 👍
Here is the **updated, clean version** with **`requirements.txt` removed completely**, keeping everything presentation/README ready and correct.

---

# 💬 ChatVerse – React Native Chat App

**ChatVerse** is a React Native chat application that supports **real-time user messaging** and a **secure personal AI assistant** powered by **Ollama**. The project focuses on **privacy, security, and practical AI usage**, making it suitable for both individuals and organizations.

⚠️ **Note:**
The **FastAPI backend code is maintained in a separate repository**.

---

## 🔗 Backend Repository (FastAPI)

📌 **Backend Source Code:**
👉 [https://github.com/maliksaadnaeem937/ChatbotUsingOllama/tree/main/Backend](https://github.com/maliksaadnaeem937/ChatbotUsingOllama/tree/main/Backend)

This repository contains:

* AI chat handling logic
* Document upload and processing
* MongoDB integration
* Ollama-based AI responses

---

## 🚀 Features

* 🔐 Secure authentication using **Appwrite**
* 👥 Real-time **user-to-user chat**
* 🤖 Personal AI assistant (Ollama-powered)
* 📄 Upload and chat with **PDF and TXT documents**
* 🛡️ Private AI (no public AI services like GPT)

---

## 🛠️ Tech Stack

### Frontend (Mobile App)

* React Native (Expo)
* Appwrite (Authentication & User Messaging)

### Backend (AI Services)

* FastAPI
* Uvicorn
* MongoDB (AI chat storage)
* Ollama (AI model)
* LangChain
* PyPDF2 (PDF text extraction)

---

## 📋 Installation Guide

### Backend Setup

1. Create a `.env` file:

```env
MONGODB_URI=your_mongodb_uri
MONGODB_DB_NAME=chat_db
```

2. Run the backend:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

📌 Make sure your **PC and mobile device are on the same network**.

---

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
EXPO_PUBLIC_BACKEND_URL=http://your-pc-ip:8000
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_url
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

Replace `your-pc-ip` with your local IP
(e.g., `192.168.137.15`)

---

## 🚀 Run the Application

```bash
# Backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend
npx expo start
```



## 🔌 Backend API Endpoints

| Endpoint       | Method | Description           |
| -------------- | ------ | --------------------- |
| `/ask-llm`     | POST   | Chat with AI          |
| `/ask-llm-doc` | POST   | Upload document to AI |
| `/get-chats`   | POST   | Fetch AI chat history |


## 📁 Project Structure

### Backend

* `main.py` – FastAPI server
* `database.py` – MongoDB connection
* `models.py` – Pydantic schemas

### Frontend

* `app/(chat)/` – Chat screens
* `contexts/ChatContext.js` – Chat logic
* `lib/appwrite.js` – Appwrite configuration



## 🔧 Requirements

* Appwrite instance running
* MongoDB database
* Ollama installed locally or on a private server
* Python 3.8+
* Node.js



## 💡 Notes

* Backend and frontend must be on the **same LAN**
* Update FastAPI CORS settings if frontend origin changes
* Backend code is separated for better security and modularity
