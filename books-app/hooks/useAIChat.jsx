import { useState, useEffect } from "react";
import useUser from "./useUser";

// ⚠️ Replace this with your PC's local IP
const API_HOST = "http://192.168.1.100:8000"; // <-- your PC IP

export default function useAiChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- Load previous AI messages ----------------
  const loadMessages = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_HOST}/get-chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.$id }),
      });
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to load AI messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Send message to AI ----------------
  const sendMessage = async (text) => {
    if (!text || !user) return;

    // Add user message locally
    const userMsg = {
      senderId: user.$id,
      messageText: text,
      $id: Date.now().toString(),
      type: "user",
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${API_HOST}/ask-llm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, userId: user.$id }),
      });
      const data = await res.json();

      // Add AI response locally
      const aiMsg = {
        senderId: "ai",
        messageText: data.text,
        $id: Date.now().toString() + "_ai",
        type: "assistant",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Failed to send message to AI:", err);
    }
  };

  // Optional: delete message locally (UI only)
  const deleteMessage = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.$id !== messageId));
  };

  useEffect(() => {
    loadMessages();
  }, [user]);

  return {
    messages,
    sendMessage,
    loadMessages,
    deleteMessage,
    loading,
  };
}
