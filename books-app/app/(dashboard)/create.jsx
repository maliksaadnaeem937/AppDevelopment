import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { APPWRITE_ERROR_MESSAGES } from "../../constants/AppwriteErrors";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedPressable from "../../components/ThemedPressable";
import ThemedActivityIndicator from "../../components/ThemedActivityIndicator";
import useBooks from "../../hooks/useBooks";
import ThemedTextInput from "../../components/ThemedTextInput";
import { router } from "expo-router";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const { createBook } = useBooks();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(title, author, description);
      if (!title.trim() || !author.trim() || !description.trim()) {
        throw new Error(APPWRITE_ERROR_MESSAGES["Fill out all fields!"]);
      }
      await createBook({ title, author, description });
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Book Added!.",
        position: "bottom",
        visibilityTime: 1000,
      });
      router.replace("/books");
      setTitle("");
      setAuthor("");
      setDescription("");
    } catch (error) {
      const message =
        APPWRITE_ERROR_MESSAGES[error.message] ||
        APPWRITE_ERROR_MESSAGES["default"];
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: message,
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <ThemedText title={true} style={styles.header}>
          Add a New Book
        </ThemedText>
        <ThemedText style={styles.subHeader}>
          Fill in the details below to add a book
        </ThemedText>

        <View style={styles.form}>
          <ThemedTextInput
            style={styles.input}
            placeholder="Book Title"
            value={title}
            onChangeText={setTitle}
          />
          <ThemedTextInput
            style={styles.input}
            placeholder="Author"
            value={author}
            onChangeText={setAuthor}
          />
          <ThemedTextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          {loading ? (
            <ThemedActivityIndicator size={40} />
          ) : (
            <ThemedPressable onPress={handleSubmit} disabled={loading}>
              Add
            </ThemedPressable>
          )}
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  subHeader: {
    textAlign: "center",
    fontSize: 16,
  },
  form: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Create;
