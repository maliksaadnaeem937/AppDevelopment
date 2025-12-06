import React from "react";
import { StyleSheet } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const Books = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedText style={styles.title} title={true}>
        Your reading List....
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default Books;
