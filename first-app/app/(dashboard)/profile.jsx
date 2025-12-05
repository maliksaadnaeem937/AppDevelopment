import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";

const Profile = () => {
  return (
    <ThemedView styles={styles.container}>
      <ThemedText title={true} style={styles.title}>
        Your Email
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
    fontStyle: "bold",
    fontSize: 18,
  },
  text: {},
});

export default Profile;
