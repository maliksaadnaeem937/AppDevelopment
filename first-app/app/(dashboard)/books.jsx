import React from "react";
import { StyleSheet, FlatList, Pressable } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import useBooks from "../../hooks/useBooks";
import ThemedBooksCard from "../../components/ThemedBooksCard";
import { useCallback } from "react";
import { router } from "expo-router";

const Books = () => {
  const { books } = useBooks();

  const navigateToBookDetails = useCallback(
    (id) => {
      console.log("id = ", id);
      router.push(`/book/${id}`);
    },
    [router]
  );

  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedText style={styles.title} title={true}>
        Your reading List....
      </ThemedText>
      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          return (
            <ThemedBooksCard
              book={item}
              onPress={() => navigateToBookDetails(item.$id)}
            />
          );
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    textTransform:"capitalize"
  },
  text: {
    textAlign: "center",
  },
});

export default Books;
