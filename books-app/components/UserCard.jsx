import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const UserCard = ({ user, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={() => onPress(user)}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.username.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* User Info */}
      <View style={styles.info}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.subText}>Tap to chat</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: "#1f0202ff",
    borderLeftWidth: 5,
    marginInline: 5,
    borderLeftColor: "blue",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  info: {
    flex: 1,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
});

export default UserCard;
