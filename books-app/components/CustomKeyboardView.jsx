import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ios = Platform.OS == "ios";
const CustomKeyboardView = ({ children }) => {
  const inset = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default CustomKeyboardView;
