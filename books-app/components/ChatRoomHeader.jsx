import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { colors as themeColors } from "../lib/chat-colors";

const ChatRoomHeader = ({ receiverName, receiverAvatar, isOnline, colors }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  // use central chat-colors if no colors prop passed
  const theme = colors || themeColors(colorScheme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.headerBackground,
          borderBottomColor: theme.border,
        },
      ]}
    >
      {/* Back button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={[styles.backText, { color: theme.textPrimary }]}>
          {"<"}
        </Text>
      </Pressable>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {receiverAvatar ? (
          <Image source={{ uri: receiverAvatar }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: theme.avatarBackground },
            ]}
          >
            <Text style={[styles.avatarInitial, { color: theme.textPrimary }]}>
              {receiverName?.[0]?.toUpperCase() || "U"}
            </Text>
          </View>
        )}
      </View>

      {/* Name and status */}
      <View style={styles.nameContainer}>
        <Text
          style={[styles.title, { color: theme.textPrimary }]}
          numberOfLines={1}
        >
          {receiverName || "Chat"}
        </Text>
        
        {isOnline !== undefined && (
          <Text
            style={[
              styles.status,
              { color: isOnline ? theme.online : theme.offline },
            ]}
          >
            {isOnline ? "Online" : "Offline"}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
  },
  backText: {
    fontSize: 20,
    fontWeight: "600",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: "600",
  },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flexShrink: 1,
  },
  status: {
    fontSize: 12,
    marginTop: 2,
  },
});
