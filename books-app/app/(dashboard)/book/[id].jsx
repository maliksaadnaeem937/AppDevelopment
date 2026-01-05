import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  Pressable,
  View,
  Text,
} from "react-native";
import useBooks from "../../../hooks/useBooks";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "../../../constants/Colors";
import Toast from "react-native-toast-message";

const BookDetail = () => {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState(null);
  const { fetchBookById, deleteBook } = useBooks();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteBook(id);
      setBook(null);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Book Deleted",
      });
      router.replace("/books");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      router.replace("/books");
    }
  }, []);

  useEffect(() => {
    const loadBook = async () => {
      const result = await fetchBookById(id);
      setBook(result);
    };
    loadBook();
  }, [id]);

  if (!book) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <Text style={{ color: theme.text, fontSize: 18 }}>Loading book...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { backgroundColor: theme.myBubble }]}>
        <Text style={[styles.title, { color: theme.title }]}>{book.title}</Text>
        <Text style={[styles.author, { color: theme.otherText }]}>
          Written By: {book.author || "Unknown"}
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {book.description || "No description available."}
        </Text>
      </View>

      <Pressable
        style={[
          styles.deleteButton,
          { backgroundColor: theme.warning || "#ee6161" },
        ]}
        onPress={() => handleDelete(book.$id)}
      >
        <Text style={styles.deleteButtonText}>Delete Book</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  deleteButton: {
    width: "80%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default BookDetail;
