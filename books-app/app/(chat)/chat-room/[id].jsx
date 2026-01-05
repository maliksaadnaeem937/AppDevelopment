import React, { useRef, useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message"; // Import Toast

import ChatRoomHeader from "../../../components/ChatRoomHeader";
import { ChatContext } from "../../../contexts/ChatContext";
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
  const { id: chatId, name: receiverName, ai } = useLocalSearchParams();
  const isAI = ai === "1" || chatId === "ai";

  const { user } = useUser();
  const {
    messages,
    sendMessage,
    loadMessages,
    loadAIMessages,
    askAI,
    sendDocumentToAI,
    deleteMessage,
  } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const flatListRef = useRef(null);
  const colorScheme = useColorScheme();
  const colors = themeColors(colorScheme);

  // ---------------- Load messages on mount ----------------
  useEffect(() => {
    const load = async () => {
      setLoadingMessages(true);
      try {
        if (isAI) {
          await loadAIMessages();
        } else {
          await loadMessages(chatId);
        }
      } catch (error) {
        console.log("Load messages error:", error);
        Toast.show({
          type: "error",
          text1: "Failed to load messages",
          text2: "Please check your connection",
        });
      } finally {
        setLoadingMessages(false);
      }
    };
    load();
  }, [chatId, isAI]);

  // ---------------- Delete message ----------------
  const handleDelete = (messageId) => {
    if (isAI) return; // Disable delete for AI chats
    if (!messageId) return;
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMessage(messageId);
              Toast.show({
                type: "success",
                text1: "Message deleted",
              });
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Failed to delete message",
              });
            }
          },
        },
      ]
    );
  };

  // ---------------- Scroll to bottom ----------------
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // ---------------- Send text message ----------------
  const handleSend = async () => {
    if (!text.trim()) {
      Toast.show({
        type: "warning",
        text1: "Empty message",
        text2: "Please type a message before sending",
      });
      return;
    }

    const messageText = text;
    setText("");
    setSending(true);

    try {
      if (isAI) {
        await askAI(messageText);
        Toast.show({
          type: "success",
          text1: "Message sent",
          text2: "AI is processing your request",
        });
      } else {
        await sendMessage(messageText, chatId);
        Toast.show({
          type: "success",
          text1: "Message sent",
        });
      }
    } catch (error) {
      console.log("Send error:", error);
      Toast.show({
        type: "error",
        text1: "Send failed",
        text2: error.message || "Could not send your message",
      });
    } finally {
      setSending(false);
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  // ---------------- Send document ----------------
  const handleDocumentUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "text/plain"],
      });

      console.log("Document picker result:", res);

      // Check if user canceled
      if (res.canceled || !res.assets || res.assets.length === 0) {
        console.log("Document picker was canceled");
        return;
      }

      // Use the first asset from the response
      const file = res.assets[0];

      if (!file || !file.uri) {
        throw new Error("Invalid file selected");
      }

      console.log("Selected file:", file);

      // Create FormData object
      const formData = new FormData();

      // Create file object - this is the proper format for React Native
      const fileObject = {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      };

      // Append the file
      formData.append("file", fileObject);

      // Append user ID and query
      formData.append("userId", user.$id);
      const userQuery = text.trim() || "Please analyze this document";
      formData.append("userQuery", userQuery);

      console.log("FormData created, sending to AI...");
      setSending(true);

      // Send the document to AI
      await sendDocumentToAI(formData);

      Toast.show({
        type: "success",
        text1: "Document uploaded successfully",
        text2: "AI is analyzing your document",
      });

      // After sending, reload AI messages to get the updated conversation
      await loadAIMessages();

      setText("");
    } catch (err) {
      console.log("Document upload error details:", err.message);

      let errorMessage = err.message || "Could not upload the document";

      // Provide more user-friendly error messages
      if (errorMessage.includes("Network request failed")) {
        errorMessage = "Network error. Please check your connection.";
      } else if (errorMessage.includes("bytes object has no attribute")) {
        errorMessage = "Invalid file format. Please try a different file.";
      } else if (errorMessage.includes("'ai_response'")) {
        errorMessage = "AI service error. Please try again.";
      }

      // Show error toast
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: errorMessage,
      });
    } finally {
      setSending(false);
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.headerWrapper}>
        <ChatRoomHeader receiverName={receiverName} colors={colors} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={[styles.chatArea, { backgroundColor: colors.chatArea }]}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.$id}
            contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MessageBubble
                message={item}
                isMe={item.senderId === user?.$id}
                onDelete={handleDelete}
                colors={colors}
              />
            )}
          />

          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: colors.inputWrapper },
            ]}
          >
            <TextInput
              style={[
                styles.inputBox,
                {
                  backgroundColor: colors.inputBox,
                  color: colors.inputText,
                  opacity: sending || loadingMessages ? 0.6 : 1,
                },
              ]}
              placeholder="Type your message"
              placeholderTextColor={colorScheme === "dark" ? "#999" : "#888"}
              value={text}
              onChangeText={setText}
              multiline
              editable={!sending && !loadingMessages}
            />

            <Pressable
              style={[
                styles.sendBtn,
                {
                  backgroundColor:
                    sending || loadingMessages ? "#999" : colors.sendBtn,
                },
              ]}
              onPress={handleSend}
              disabled={sending || loadingMessages}
            >
              <Text style={[styles.sendText, { color: colors.sendText }]}>
                Send
              </Text>
            </Pressable>

            {isAI && (
              <Pressable
                style={[
                  styles.sendBtn,
                  { backgroundColor: sending ? "#999" : colors.sendBtn },
                ]}
                onPress={handleDocumentUpload}
                disabled={sending || loadingMessages}
              >
                <Text style={[styles.sendText, { color: colors.sendText }]}>
                  +Doc
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Add Toast component at the end of your component */}
      <Toast />
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
    alignItems: "center",
  },
  sendText: {
    fontWeight: "600",
  },
});
