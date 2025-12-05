import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Colors from "../../constants/Colors";
import ThemedLink from "../../components/ThemedLink";

const Login = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title]} title={true}>
        Login Here!
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
          Login
        </ThemedText>
      </Pressable>
      <ThemedLink href={"register"} style={styles.link}>
        Register Here
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

export default Login;
