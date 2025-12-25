import React from "react";
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from "react-native";
import Colors from "../constants/Colors";
import ThemedText from "./ThemedText";

const ThemedBooksCard = ({ book, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  console.log(book);
  return (
    <Pressable
      style={[
        {
          backgroundColor: theme.uiBackground,
          shadowColor: theme.text,
        },
        styles.pressable,
      ]}
      {...props}
    >
      <View style={{ rowGap: 8 }}>
        <ThemedText title={true} style={[styles.title]}>
          Title - {book.title}
        </ThemedText>
        <ThemedText>Author - {book.author}</ThemedText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderLeftColor: "blue",
    borderLeftWidth: 5,
    paddingBlock: 8,
    paddingInline: 8,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});

export default ThemedBooksCard;
