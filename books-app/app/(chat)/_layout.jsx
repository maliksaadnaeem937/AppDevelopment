import { Stack } from "expo-router";
import React from "react";
import UserOnly from "../(dashboard)/UserOnly";
import ChatProvider from "../../contexts/ChatContext";
import { StatusBar, useColorScheme } from "react-native";

const ChatLayout = () => {
  const colorScheme = useColorScheme();

  const colors = {
    background: colorScheme === "dark" ? "#1e1e1e" : "#f5f5f5",
    headerBackground: colorScheme === "dark" ? "#2a2a2a" : "#4a90e2",
    headerText: "#fff", // keeping header text white for both modes
  };

  return (
    <UserOnly>
      <ChatProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.headerBackground },
            headerTintColor: colors.headerText,
            headerTitleStyle: { fontWeight: "600" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name="chat-home"
            options={{
              title: "Chats",
            }}
          />

          <Stack.Screen
            name="chat-room/[id]"
            options={{
              headerShown: false, 
            }}
          />
        </Stack>
      </ChatProvider>
    </UserOnly>
  );
};

export default ChatLayout;
