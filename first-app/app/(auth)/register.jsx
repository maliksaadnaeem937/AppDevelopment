import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Colors from "../../constants/Colors";
import ThemedLink from "../../components/ThemedLink";

const Register = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title]} title={true}>
        Register For an Account!
      </ThemedText>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        <ThemedText
          style={{
            fontStyle: "bold",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Register
        </ThemedText>
      </Pressable>
      <ThemedLink href={"login"} style={styles.link}>
        Login Here
      </ThemedLink>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontStyle: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  btn: {
    backgroundColor: Colors["primary"],
    paddingBlock: 5,
    paddingInline: 15,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.8,
  },
  link: {
    paddingInline: 10,
    paddingBlock: 5,
    borderRadius: 5,
  },
});

export default Register;
