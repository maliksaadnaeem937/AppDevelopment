import React from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default AuthLayout;
