import React from "react";
import { FlatList } from "react-native";
import useChat from "../../hooks/useChat";
import ThemedView from "../../components/ThemedView";
import ThemedActivityIndicator from "../../components/ThemedActivityIndicator";
import UserCard from "../../components/UserCard";
import useUser from "../../hooks/useUser";
import { router } from "expo-router";

const ChatHome = () => {
  const { users, loadingUsers, loadMessages, setActiveChatId } = useChat();
  const { user } = useUser();

  const openChat = async (receiverId) => {
    if (!user || !receiverId) return; // Safety check

    console.log("Opening chat for sender = ", user.$id);
    console.log("Opening chat for Reciever = ", receiverId);

    const CHAT_ID = [String(user.$id), String(receiverId)].sort().join("_");
    console.log("Chat id =", CHAT_ID);

    setActiveChatId(CHAT_ID);
    // Load messages for this chat
    await loadMessages(CHAT_ID);

    router.push(`/chat-room/${CHAT_ID}`);
  };

  if (loadingUsers) {
    return (
      <ThemedView
        safe
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedActivityIndicator size={70} />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => openChat(item.userId)} />
        )}
      />
    </ThemedView>
  );
};

export default ChatHome;
