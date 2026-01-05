import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Keyboard,
  Animated,
  Alert,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatRoomHeader from "../../../components/ChatRoomHeader";
import useChat from "../../../hooks/useChat";
import useUser from "../../../hooks/useUser";
import { useLocalSearchParams } from "expo-router";
import { colors as themeColors } from "../../../lib/chat-colors";

// Format timestamp
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
const MessageBubble = ({ message, isMe, onDelete, colors }) => (
  <Pressable
    onLongPress={() => isMe && onDelete?.(message.$id)}
    style={[
      styles.bubble,
      {
        backgroundColor: isMe ? colors.myBubble : colors.otherBubble,
        alignSelf: isMe ? "flex-end" : "flex-start",
        borderBottomRightRadius: isMe ? 4 : 16,
        borderBottomLeftRadius: isMe ? 16 : 4,
      },
    ]}
  >
    <Text
      style={{
        color: isMe ? colors.myText : colors.otherText,
        fontSize: 15,
        lineHeight: 20,
      }}
    >
      {message.messageText}
    </Text>
    <Text
      style={{
        fontSize: 10,
        color: colors.timeText,
        marginTop: 2,
        alignSelf: "flex-end",
      }}
    >
      {formatTime(message.$createdAt)}
    </Text>
  </Pressable>
);

// ---------------- CHAT ROOM ----------------
const ChatRoom = () => {
  const { id: chatId, name: receiverName } = useLocalSearchParams();
  const { user } = useUser();
  const { messages, sendMessage, deleteMessage } = useChat();

  const [text, setText] = useState("");
  const [keyboardHeight] = useState(new Animated.Value(0));
  const flatListRef = useRef(null);
  const colorScheme = useColorScheme();

  // ---------------- COLORS ----------------
  const colors = themeColors(colorScheme); // <-- get colors from chat-colors.js

  // Delete message
  const handleDelete = (messageId) => {
    if (!messageId) return;
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMessage(messageId),
        },
      ]
    );
  };

  // Keyboard handling
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

  // Scroll to bottom
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.headerWrapper}>
        <ChatRoomHeader receiverName={receiverName} colors={colors} />
      </View>

      <View style={[styles.chatArea, { backgroundColor: colors.chatArea }]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isMe={item.senderId === user?.$id}
              onDelete={handleDelete}
              colors={colors}
            />
          )}
          style={{ flex: 1 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <Animated.View
          style={[
            styles.inputWrapper,
            {
              marginBottom: keyboardHeight,
              backgroundColor: colors.inputWrapper,
            },
          ]}
        >
          <TextInput
            style={[
              styles.inputBox,
              { backgroundColor: colors.inputBox, color: colors.inputText },
            ]}
            placeholder="Type your message"
            placeholderTextColor={colorScheme === "dark" ? "#999" : "#888"}
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable
            style={[styles.sendBtn, { backgroundColor: colors.sendBtn }]}
            onPress={handleSend}
          >
            <Text style={[styles.sendText, { color: colors.sendText }]}>
              Send
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrapper: { zIndex: 1 },
  chatArea: { flex: 1 },
  bubble: {
    maxWidth: "75%",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginVertical: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
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
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendText: {
    fontWeight: "600",
  },
});
