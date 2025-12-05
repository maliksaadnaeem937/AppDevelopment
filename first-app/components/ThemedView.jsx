import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Colors from "../constants/Colors";
const ThemedView = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ThemedView;
