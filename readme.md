# 📚 React Native Book & Chat App

A **React Native** mobile app built with **Expo**, featuring **user authentication**, **personal book management**, and **real-time chat**. Backend powered by **Appwrite**.

---

## 🚀 Features

### Authentication
- Email/password login & registration
- Route guards:
  - `GuestOnly` — only accessible by unauthenticated users
  - `UserOnly` — only accessible by logged-in users

### Books Management
- View your personal book list
- Add new books with title, author, and description
- Delete your own books

### Chat
- Real-time chat with other users
- Chat rooms automatically created per user pair
- Send messages in real-time

### UI & UX
- Dark/light theme support
- Responsive and intuitive interface
- Activity indicators for loading states

---

## 🖥 Screens

- **Home Screen** – Welcome page with links to register, dashboard, and chat
- **Login / Register** – Email/password authentication
- **Profile Dashboard** – Shows user email and logout
- **Books List** – View your added books
- **Add Book** – Form to create a new book
- **Book Details** – View and delete book
- **Chat Home** – List of users to chat with
- **Chat Room** – Real-time messaging

---

## ⚙️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-folder>

# Install dependencies
npm install

# Run the app with Expo
npx expo start
