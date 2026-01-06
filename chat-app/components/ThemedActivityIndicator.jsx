import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
const ThemedActivityIndicator = ({ ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <ActivityIndicator
      color={theme.text}
      size="large"
      {...props}
    ></ActivityIndicator>
  );
};

const styles = StyleSheet.create({});

export default ThemedActivityIndicator;
