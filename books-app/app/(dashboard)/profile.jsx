import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, ActivityIndicator, useColorScheme } from "react-native";
import { router } from "expo-router";
import useUser from "../../hooks/useUser";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      router.replace("/login");
    } catch (error) {
      console.log(error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: theme.myBubble }]}>
        <Text style={[styles.avatarText, { color: theme.myText }]}>
          {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
        </Text>
      </View>

      {/* User Info */}
      <Text style={[styles.title, { color: theme.title }]}>{user?.email}</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Welcome! Start exploring books, chat with AI, or manage your content.
      </Text>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: theme.sendBtn }]}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-outline" size={22} color={theme.sendText} style={{ marginRight: 8 }} />
          <Text style={[styles.buttonText, { color: theme.sendText }]}>My Profile</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: theme.myBubble }]}
          onPress={() => router.push("/books")}
        >
          <Ionicons name="book-outline" size={22} color={theme.myText} style={{ marginRight: 8 }} />
          <Text style={[styles.buttonText, { color: theme.myText }]}>My Books</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: theme.otherBubble }]}
          onPress={() => router.push("/chat-home")}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={22} color={theme.otherText} style={{ marginRight: 8 }} />
          <Text style={[styles.buttonText, { color: theme.otherText }]}>Chat</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: theme.sendBtn }]}
          onPress={handleLogout}
        >
          {loading ? (
            <ActivityIndicator color={theme.sendText} />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={22} color={theme.sendText} style={{ marginRight: 8 }} />
              <Text style={[styles.buttonText, { color: theme.sendText }]}>Logout</Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  buttonsContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
