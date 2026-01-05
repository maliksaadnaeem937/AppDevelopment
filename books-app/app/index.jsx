import {
  StyleSheet,
  Image,
  Pressable,
  View,
  Text,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { colors as themeColors } from "../lib/chat-colors";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = themeColors(colorScheme);
  const router = useRouter();

  const logoUrl = "https://img.icons8.com/color/512/chat--v1.png"; // reliable online logo

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Logo */}
      <Image
        source={{ uri: logoUrl }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={[styles.title, { color: colors.title }]}>
        Welcome to ChatBook
      </Text>

      {/* Description */}
      <Text style={[styles.description, { color: colors.text }]}>
        Connect with AI or other users, explore books, and manage your
        collection—all in one app!
      </Text>

      {/* Buttons */}
      <Pressable
        style={[styles.button, { backgroundColor: colors.sendBtn }]}
        onPress={() => router.push("/register")}
      >
        <Text style={[styles.buttonText, { color: colors.sendText }]}>
          No account yet? Register
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: colors.myBubble }]}
        onPress={() => router.push("/profile")}
      >
        <Text style={[styles.buttonText, { color: colors.myText }]}>
          Already registered? Go to Dashboard
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: colors.otherBubble }]}
        onPress={() => router.push("/chat-home")}
      >
        <Text style={[styles.buttonText, { color: colors.otherText }]}>
          Want to chat? Open Chat
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  button: {
    width: "85%",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
