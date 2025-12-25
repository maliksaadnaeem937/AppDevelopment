import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

const ThemedCard = ({ children, style }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.uiBackground,
          shadowColor: theme.text,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginVertical: 10,
  },
});

export default ThemedCard;
