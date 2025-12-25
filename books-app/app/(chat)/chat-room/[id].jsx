import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatRoomHeader from "../../../components/ChatRoomHeader";
import useChat from "../../../hooks/useChat";
import useUser from "../../../hooks/useUser";
import { useLocalSearchParams } from "expo-router";

/* ---------------- MESSAGE BUBBLE COMPONENT ---------------- */
const MessageBubble = ({ message, isMe }) => (
  <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
    <Text style={isMe ? styles.myText : styles.otherText}>
      {message.messageText}
    </Text>
  </View>
);

/* ---------------- MAIN CHAT ROOM ---------------- */
const ChatRoom = () => {
  const { id: chatId } = useLocalSearchParams();
  const { user } = useUser();
  const { messages, sendMessage } = useChat();

  console.log("Opened chat for chat id =", chatId);

  const [text, setText] = useState("");
  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (!text.trim()) return;
    const message = text;
    setText("");
    console.log("Mesage sending mesage=",message);
    console.log("chat id = ",chatId);
    await sendMessage(message.trim(), chatId);

    // Scroll to bottom after sending a message
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    // Scroll to bottom whenever messages change
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ChatRoomHeader />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <MessageBubble
                message={item}
                isMe={item.senderId === user?.$id}
              />
            );
          }}
        />

        {/* Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="Type your message"
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoom;

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardView: {
    flex: 1,
  },
  messagesContent: {
    padding: 12,
    paddingBottom: 20,
  },
  bubble: {
    maxWidth: "75%",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginVertical: 4,
  },
  myBubble: {
    backgroundColor: "#2563eb",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  myText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
  },
  otherBubble: {
    backgroundColor: "#2a2a2a",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  otherText: {
    color: "#e5e5e5",
    fontSize: 15,
    lineHeight: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#1a1a1a",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  inputBox: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});
