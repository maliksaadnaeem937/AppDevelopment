<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Native App - README</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
    h1, h2, h3 { color: #333; }
    code { background: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
    ul { margin-left: 20px; }
    li { margin-bottom: 5px; }
    a { color: #2563eb; text-decoration: none; }
  </style>
</head>
<body>
  <h1>📚 My React Native App</h1>
  <p>A <strong>React Native</strong> mobile application built with <strong>Expo</strong> featuring <strong>user authentication, a personal book management system, and real-time chat</strong>. The app uses <strong>Appwrite</strong> as the backend for authentication, database, and real-time updates.</p>

  <h2>🚀 Features</h2>

  <h3>Authentication</h3>
  <ul>
    <li>Email & password registration and login</li>
    <li>Persistent user sessions</li>
    <li>Route guards:
      <ul>
        <li><code>GuestOnly</code> → blocks logged-in users from auth screens</li>
        <li><code>UserOnly</code> → protects dashboard and chat screens</li>
      </ul>
    </li>
  </ul>

  <h3>Book Management</h3>
  <ul>
    <li>Create, view, and delete books (no update)</li>
    <li>Each book is associated with a user</li>
    <li>Real-time updates when books are added or deleted</li>
    <li>Dynamic book detail view</li>
  </ul>

  <h3>Real-Time Chat</h3>
  <ul>
    <li>One-to-one messaging between users</li>
    <li>Auto-generated deterministic chat IDs</li>
    <li>Real-time message updates</li>
    <li>Chat home showing all users except the current user</li>
    <li>Chat room with:
      <ul>
        <li>Message bubbles (different styles for sent/received)</li>
        <li>Keyboard handling</li>
        <li>Auto-scroll to latest message</li>
      </ul>
    </li>
  </ul>

  <h3>User Dashboard</h3>
  <ul>
    <li>Profile screen with user email and logout</li>
    <li>Tab-based navigation:
      <ul>
        <li>Profile</li>
        <li>Books</li>
        <li>Add Book</li>
      </ul>
    </li>
  </ul>

  <h3>UI & UX</h3>
  <ul>
    <li>Dark / Light theme support</li>
    <li>Reusable themed components (<code>ThemedView</code>, <code>ThemedText</code>, etc.)</li>
    <li>Toast notifications for success & error messages</li>
    <li>Activity indicators for loading states</li>
    <li>Keyboard-safe layouts</li>
  </ul>

  <h2>🏗 Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React Native, Expo</li>
    <li><strong>Navigation:</strong> expo-router (Stack + Tabs)</li>
    <li><strong>Backend:</strong> Appwrite (Authentication, Databases, Real-time)</li>
    <li><strong>State Management:</strong> React Context API</li>
    <li><strong>Libraries & Tools:</strong>
      <ul>
        <li>react-native-toast-message (Notifications)</li>
        <li>react-native-safe-area-context</li>
        <li>expo-status-bar</li>
        <li>react-native-vector-icons</li>
        <li>react-native-appwrite</li>
      </ul>
    </li>
  </ul>

  <h2>📁 Project Architecture</h2>
  <pre>
/
├─ app/
│  ├─ (auth)/ login.js, register.js, AuthLayout.js
│  ├─ (dashboard)/ profile.js, books.js, create.js, DashboardLayout.js
│  ├─ (chat)/ chat-home.js, chat-room/[id].js, ChatLayout.js
│  └─ index.js (HomeScreen)
├─ components/ ThemedView.js, ThemedText.js, ThemedTextInput.js, ThemedPressable.js, ThemedBooksCard.js, UserCard.js, ChatRoomHeader.js, ThemedActivityIndicator.js
├─ contexts/ UserContext.js, BooksContext.js, ChatContext.js
├─ hooks/ useUser.js, useBooks.js, useChat.js
├─ lib/ appwrite.js
├─ constants/ Colors.js, AppwriteErrors.js
└─ assets/
  </pre>

  <h2>⚙️ Setup & Installation</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone &lt;repository-url&gt;
cd &lt;project-folder&gt;</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install
# or
yarn install</code></pre>
    </li>
    <li>Configure Appwrite:
      <ul>
        <li>Create an Appwrite project</li>
        <li>Enable Authentication (Email/Password)</li>
        <li>Create Databases and Collections:
          <ul>
            <li>Users collection</li>
            <li>Books collection</li>
            <li>Messages collection</li>
          </ul>
        </li>
        <li>Update <code>lib/appwrite.js</code> with your Project ID, Endpoint, and collection IDs.</li>
      </ul>
    </li>
    <li>Start the Expo app:
      <pre><code>npx expo start</code></pre>
    </li>
  </ol>

  <h2>🖥 Screens</h2>
  <ul>
    <li>Authentication: Login, Register</li>
    <li>Dashboard: Profile, Books list, Add Book</li>
    <li>Chat: Users list (Chat Home), Chat room</li>
  </ul>

  <h2>🔒 Security & Permissions</h2>
  <ul>
    <li>Books: Only owner can delete a book</li>
    <li>Chat messages: Only sender can update/delete, readable by all users</li>
  </ul>

  <h2>📈 Future Improvements</h2>
  <ul>
    <li>Add update book functionality</li>
    <li>Group chats or multi-user chat support</li>
    <li>Push notifications</li>
    <li>Search functionality in books and chat</li>
  </ul>

  <h2>💡 Notes</h2>
  <ul>
    <li>Uses Context API for state management</li>
    <li>All components are theme-aware (light/dark)</li>
    <li>Real-time updates powered by Appwrite subscriptions</li>
  </ul>

  <h2>🎯 Author</h2>
  <p>Your Name – <a href="mailto:your@email.com">your@email.com</a></p>
</body>
</html>
