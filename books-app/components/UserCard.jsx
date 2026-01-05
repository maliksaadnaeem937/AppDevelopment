import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const UserCard = ({ user, onPress, colors }) => (
  <Pressable
    style={[
      styles.card,
      { backgroundColor: colors.card, borderLeftColor: colors.accent },
    ]}
    onPress={() => onPress(user)}
  >
    <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
      <Text style={[styles.avatarText, { color: colors.textPrimary }]}>
        {user.username.charAt(0).toUpperCase()}
      </Text>
    </View>

    <View style={styles.info}>
      <Text style={[styles.username, { color: colors.textPrimary }]}>
        {user.username}
      </Text>
      <Text style={[styles.subText, { color: colors.textSecondary }]}>
        Tap to chat
      </Text>
    </View>
  </Pressable>
);

export default UserCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginVertical: 6,
    borderRadius: 12,
    borderLeftWidth: 5,
    marginHorizontal: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { fontSize: 18, fontWeight: "600" },
  info: { flex: 1 },
  username: { fontSize: 16, fontWeight: "500" },
  subText: { fontSize: 12, marginTop: 2 },
});
