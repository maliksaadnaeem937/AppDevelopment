import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Platform,
  Pressable,
  Keyboard,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatRoomHeader from "../../../components/ChatRoomHeader";
import useChat from "../../../hooks/useChat";
import useUser from "../../../hooks/useUser";
import { useLocalSearchParams } from "expo-router";

// Format timestamp to hh:mm AM/PM
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  const m = minutes < 10 ? `0${minutes}` : minutes;
  return `${h}:${m} ${ampm}`;
};

// ---------------- MESSAGE BUBBLE ----------------
const MessageBubble = ({ message, isMe }) => (
  <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
    <Text style={isMe ? styles.myText : styles.otherText}>
      {message.messageText}
    </Text>
    <Text style={styles.timeText}>{formatTime(message.$createdAt)}</Text>
  </View>
);

// ---------------- CHAT ROOM ----------------
const ChatRoom = () => {
  const { id: chatId } = useLocalSearchParams();
  const { user } = useUser();
  const { messages, sendMessage } = useChat();

  const [text, setText] = useState("");
  const [keyboardHeight] = useState(new Animated.Value(0));
  const flatListRef = useRef(null);

  // Handle keyboard events
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardWillShow", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardWillHide", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const message = text;
    setText("");
    await sendMessage(message.trim(), chatId);
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerWrapper}>
        <ChatRoomHeader />
      </View>

      {/* Messages + Input */}
      <View style={styles.chatArea}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MessageBubble message={item} isMe={item.senderId === user?.$id} />
          )}
          style={{ flex: 1 }}
        />

        <Animated.View
          style={[styles.inputWrapper, { marginBottom: keyboardHeight }]}
        >
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
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerWrapper: {
    zIndex: 1,
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#000",
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
  timeText: {
    fontSize: 10,
    color: "#bbb",
    marginTop: 2,
    alignSelf: "flex-end",
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
