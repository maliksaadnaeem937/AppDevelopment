import React, { useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Pressable,
  View,
  Text,
  useColorScheme,
} from "react-native";
import useBooks from "../../hooks/useBooks";
import { router } from "expo-router";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Books = () => {
  const { books } = useBooks();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const navigateToBookDetails = useCallback(
    (id) => {
      router.push(`/book/${id}`);
    },
    [router]
  );

  const renderBook = ({ item }) => (
    <Pressable
      onPress={() => navigateToBookDetails(item.$id)}
      style={[styles.card, { backgroundColor: theme.myBubble }]}
    >
      <Text
        style={[styles.bookTitle, { color: theme.myText }]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <View style={styles.cardFooter}>
        <Ionicons name="book-outline" size={20} color={theme.otherText} />
        <Text style={[styles.bookAuthor, { color: theme.otherText }]}>
          {item.author || "Unknown Author"}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.title }]}>
        Your Reading List
      </Text>

      {books.length === 0 ? (
        <Text style={[styles.noBooks, { color: theme.text }]}>
          You haven’t added any books yet.
        </Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.$id}
          renderItem={renderBook}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  noBooks: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  list: {
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bookAuthor: {
    fontSize: 14,
  },
});

export default Books;
