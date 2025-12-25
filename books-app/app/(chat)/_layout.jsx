import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import UserOnly from "../(dashboard)/UserOnly";
import ChatProvider from "../../contexts/ChatContext";
import { StatusBar } from "expo-status-bar";

const ChatLayout = () => {
  return (
    <ChatProvider>
      <StatusBar value="auto" />
      <Stack>
        <Stack.Screen
          name="chat-home"
          options={{
            title: "Chat Home",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="chat-room/[id]"
          options={{
            title: "Chat Room",
          }}
        ></Stack.Screen>
      </Stack>
    </ChatProvider>
  );
};

const styles = StyleSheet.create({});

export default ChatLayout;
