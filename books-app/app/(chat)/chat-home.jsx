import React, { useState, useMemo } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import UserCard from "../../components/UserCard";
import useChat from "../../hooks/useChat";
import useUser from "../../hooks/useUser";
import { router } from "expo-router";
import { colors as themeColors } from "../../lib/chat-colors";

const ChatHome = () => {
  const { users, loadingUsers, loadMessages, setActiveChatId } = useChat();
  const { user } = useUser();
  const [searchText, setSearchText] = useState("");
  const colorScheme = useColorScheme();
  const colors = themeColors(colorScheme);

  // ---------------- Open user chat ----------------
  const openChat = async (receiverId, receiverName) => {
    if (!user || !receiverId) return;

    const CHAT_ID = [String(user.$id), String(receiverId)].sort().join("_");
    setActiveChatId(CHAT_ID);
    await loadMessages(CHAT_ID);

    router.push(
      `/chat-room/${CHAT_ID}?name=${encodeURIComponent(receiverName)}`
    );
  };

  // ---------------- Open AI chat ----------------
  const openAIChat = () => {
    if (!user) return;

    router.push(
      `/chat-room/ai?name=${encodeURIComponent("AI Assistant")}&ai=1`
    );
  };

  const filteredUsers = useMemo(() => {
    if (!searchText.trim()) return users;
    return users.filter((u) =>
      u.username.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, users]);

  if (loadingUsers) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size={70} color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <TextInput
        style={[
          styles.searchBar,
          { backgroundColor: colors.inputBox, color: colors.inputText },
        ]}
        placeholder="Search users..."
        placeholderTextColor={colors.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <UserCard
            user={{ username: "AI Assistant" }}
            onPress={openAIChat}
            colors={{
              ...colors,
              avatarBackground: "#2563eb", // blue AI avatar
            }}
          />
        )}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => openChat(item.userId, item.username)}
            colors={colors}
          />
        )}
      />
    </View>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    height: 44,
    margin: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
    fontSize: 16,
  },
});
