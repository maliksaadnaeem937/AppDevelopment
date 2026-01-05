import { createContext, useCallback, useEffect, useState } from "react";
import { DATABASE_ID, databases } from "../lib/appwrite";
import { MESSAGES_COLLECTION_ID, USERS_COLLECTION_ID } from "../lib/appwrite";
import { Query, ID, Permission, Role } from "react-native-appwrite";
import useUser from "../hooks/useUser";
import client from "../lib/appwrite";

export const ChatContext = createContext(null);

// 🔹 Same chatId for both users
export const getChatId = (senderId, receiverId) => {
  return [String(senderId), String(receiverId)].sort().join("_");
};

export default function ChatProvider({ children }) {
  const { user } = useUser();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);

  // 🔹 Load all users except current user
  const loadUsers = useCallback(async () => {
    if (!user?.$id) return;
    try {
      setLoadingUsers(true);

      const response = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.notEqual("userId", user.$id)]
      );

      setUsers(response.documents);
    } catch (error) {
      console.error("Load users error:", error);
    } finally {
      setLoadingUsers(false);
    }
  }, [user?.$id]);

  // 🔹 Send message
  const sendMessage = useCallback(
    async (messageText, chatId) => {
      if (!messageText?.trim()) return;
      if (!chatId) return;
      if (!user.$id) {
        console.log("user.$id is missing while sending message");
        return;
      }

      try {
        await databases.createDocument(
          DATABASE_ID,
          MESSAGES_COLLECTION_ID,
          ID.unique(),
          { messageText, chatId: chatId, senderId: user.$id },
          [
            Permission.read(Role.any()), // readable by all
            Permission.update(Role.user(user.$id)), // only sender can update
            Permission.delete(Role.user(user.$id)), // only sender can delete
          ]
        );
      } catch (error) {
        console.error("Send message error:", error);
      }
    },
    [user?.$id]
  );

  // 🔹 Delete message
  const deleteMessage = useCallback(async (messageId) => {
    if (!messageId) return;
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        messageId
      );
      // remove locally
      setMessages((prev) => prev.filter((m) => m.$id !== messageId));
    } catch (error) {
      console.error("Delete message error:", error);
    }
  }, []);

  // 🔹 Load messages for a chat
  const loadMessages = useCallback(async (chatId) => {
    try {
      console.log("Loading messages", chatId);
      const response = await databases.listDocuments(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        [Query.equal("chatId", chatId), Query.orderAsc("$createdAt")]
      );
      setMessages(response.documents);
    } catch (error) {
      console.error("Load messages error:", error);
    }
  }, []);

  // 🔹 Load users on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // 🔹 Real-time subscription
  useEffect(() => {
    if (!user?.$id) return;

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`,
      (response) => {
        const { events, payload } = response;

        // 🔹 Only listen to message creation
        if (
          events.includes("databases.*.collections.*.documents.*.create") &&
          payload.chatId === activeChatId
        ) {
          setMessages((prev) =>
            prev.find((m) => m.$id === payload.$id) ? prev : [...prev, payload]
          );
        }

        // 🔹 Handle message deletion
        if (
          events.includes("databases.*.collections.*.documents.*.delete") &&
          payload.chatId === activeChatId
        ) {
          setMessages((prev) => prev.filter((m) => m.$id !== payload.$id));
        }
      }
    );

    return () => unsubscribe();
  }, [user?.$id, activeChatId]);

  return (
    <ChatContext.Provider
      value={{
        users,
        messages,
        loadingUsers,
        loadUsers,
        loadMessages,
        sendMessage,
        deleteMessage, // <-- added here
        activeChatId,
        setActiveChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
