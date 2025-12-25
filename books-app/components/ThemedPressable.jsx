import React from "react";
import { StyleSheet,  Pressable, Text } from "react-native";
import Colors from "../constants/Colors";

const ThemedPressable = ({ children, style: pStyle, ...props }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pStyle, pressed && styles.pressed]}
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
    textAlign: "center",
  },
});

export default ThemedPressable;
