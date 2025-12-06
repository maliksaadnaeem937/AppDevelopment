import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const Create = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.title}>
        Add a new book
      </ThemedText>
      <ThemedText style={styles.text}>
        Time to start reading some books....
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default Create;
