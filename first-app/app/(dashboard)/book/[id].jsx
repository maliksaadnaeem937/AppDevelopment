import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  Pressable,
} from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import useBooks from "../../../hooks/useBooks";
import ThemedActivityIndicator from "../../../components/ThemedActivityIndicator";
import Colors from "../../../constants/Colors";
import ThemedPressable from "../../../components/ThemedPressable";
import { Text } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { APPWRITE_ERROR_MESSAGES } from "../../../constants/AppwriteErrors";

const BookDetail = (props) => {
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
      console.log(error.message);
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
      console.log("------------book------------------");
      console.log(result);
      setBook(result);
    };
    loadBook();
  }, [id]);

  if (!book) {
    return (
      <ThemedView
        safe={true}
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ThemedActivityIndicator size={60} />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container} {...props}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView
          style={[
            styles.card,
            {
              backGroundColor: theme.bookCard,
            },
          ]}
        >
          <ThemedText title={true} style={styles.title}>
            {book.title}
          </ThemedText>
          <ThemedText style={styles.author}>
            Written By {book.author}
          </ThemedText>
          <ThemedText style={styles.description}>
            Description: {book.description}
          </ThemedText>
        </ThemedView>
        <Pressable
          style={[styles.warning]}
          onPress={() => handleDelete(book.$id)}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    paddingVertical: 20,
    paddingTop: 40,
    alignItems: "center",
    rowGap: 20,
  },
  card: {
    width: "95%",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    rowGap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  author: { fontSize: 14, marginBottom: 4, textTransform: "capitalize" },
  idText: { fontSize: 12, marginBottom: 12 },
  description: { fontSize: 16, lineHeight: 22, textAlign: "justify" },
  warning: {
    backgroundColor: "#ee6161ff",
    paddingInline: 50,
    paddingBlock: 10,
    borderRadius: 5,
  },
});

export default BookDetail;
