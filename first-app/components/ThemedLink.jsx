import { Link } from "expo-router";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Colors from "../constants/Colors";

const ThemedLink = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors["light"];

  return (
    <Link
      style={[
        {
          color: theme.linkColor,
          backgroundColor: theme.linkBackground,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Link>
  );
};

const styles = StyleSheet.create({});

export default ThemedLink;
