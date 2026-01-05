import { createContext, useCallback, useEffect, useState } from "react";
import { DATABASE_ID, databases } from "../lib/appwrite";
import { MESSAGES_COLLECTION_ID, USERS_COLLECTION_ID } from "../lib/appwrite";
import { Query, ID, Permission, Role } from "react-native-appwrite";
import useUser from "../hooks/useUser";
import client from "../lib/appwrite";

export const ChatContext = createContext(null);

// 🔹 Same chatId for both users
export const getChatId = (senderId, receiverId) =>
  [String(senderId), String(receiverId)].sort().join("_");

export default function ChatProvider({ children }) {
  const { user } = useUser();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);
  const [sending, setSending] = useState(false);

  // ---------------- Load users ----------------
  const loadUsers = useCallback(async () => {
    if (!user?.$id) return;
    setLoadingUsers(true);
    try {
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

  // ---------------- User messages ----------------
  const sendMessage = useCallback(
    async (messageText, chatId) => {
      if (!messageText?.trim() || !chatId || !user?.$id) return;
      try {
        await databases.createDocument(
          DATABASE_ID,
          MESSAGES_COLLECTION_ID,
          ID.unique(),
          { messageText, chatId, senderId: user.$id },
          [
            Permission.read(Role.any()),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ]
        );
      } catch (error) {
        console.error("Send message error:", error);
      }
    },
    [user?.$id]
  );

  const deleteMessage = useCallback(async (messageId) => {
    if (!messageId) return;
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        messageId
      );
      setMessages((prev) => prev.filter((m) => m.$id !== messageId));
    } catch (error) {
      console.error("Delete message error:", error);
    }
  }, []);

  const loadMessages = useCallback(async (chatId) => {
    if (!chatId) return;
    try {
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

  // ---------------- AI messages ----------------
  const loadAIMessages = useCallback(async () => {
    if (!user?.$id) return;
    try {
      const res = await fetch("http://192.168.43.79:8000/get-chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.$id }),
      });
      const data = await res.json();
      const normalized = (data.messages || []).map((msg, index) => ({
        $id: `ai_${index}`,
        senderId: msg.type === "user" ? user.$id : "ai",
        messageText: msg.text,
        $createdAt: new Date().toISOString(),
      }));
      setMessages(normalized);
    } catch (err) {
      console.error("Failed to load AI messages:", err);
    }
  }, [user?.$id]);

  const sendDocumentToAI = async (formData) => {
    try {
      console.log("Sending document to AI...");

      const response = await fetch("http://192.168.43.79:8000/ask-llm-doc", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Server error response:", errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("AI response received:", data);

      // Return the data instead of trying to update messages here
      return data;
    } catch (error) {
      console.log("AI document fetch error details:", error.message);
      throw error;
    }
  };
  const askAI = useCallback(
    async (text) => {
      if (!user?.$id || !text?.trim()) return;
      const userMsg = {
        $id: Date.now().toString(),
        senderId: user.$id,
        messageText: text,
        $createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const res = await fetch("http://192.168.43.79:8000/ask-llm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.$id, query: text }),
        });
        const data = await res.json();
        const aiMsg = {
          $id: Date.now().toString() + "_ai",
          senderId: "ai",
          messageText: data.text,
          $createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err) {
        console.error("Failed to send AI message:", err);
      }
    },
    [user?.$id]
  );

  // ---------------- Real-time subscription for user messages ----------------
  useEffect(() => {
    if (!user?.$id) return;

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`,
      (response) => {
        const { events, payload } = response;

        if (
          events.includes("databases.*.collections.*.documents.*.create") &&
          payload.chatId === activeChatId
        ) {
          setMessages((prev) =>
            prev.find((m) => m.$id === payload.$id) ? prev : [...prev, payload]
          );
        }

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

  // ---------------- Load users on mount ----------------
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <ChatContext.Provider
      value={{
        users,
        messages,
        loadingUsers,
        loadUsers,
        loadMessages,
        sendMessage,
        deleteMessage,
        activeChatId,
        setActiveChatId,
        // AI
        loadAIMessages,
        askAI,
        sendDocumentToAI,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
