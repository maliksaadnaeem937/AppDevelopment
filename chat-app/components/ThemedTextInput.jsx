import React from "react";
import { StyleSheet, TextInput, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

const ThemedTextInput = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    ></TextInput>
  );
};

const styles = StyleSheet.create({});

export default ThemedTextInput;
