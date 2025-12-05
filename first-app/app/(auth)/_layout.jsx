import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

const Layout = () => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors["light"];
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    
    ></Stack>
  );
};

const styles = StyleSheet.create({});

export default Layout;
