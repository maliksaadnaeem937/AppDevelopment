import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native"; // Added Text here
import Colors from "../constants/Colors";

const ThemedPressable = ({ children, ...props }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  btn: {
    backgroundColor: Colors["primary"],
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
});

export default ThemedPressable;
