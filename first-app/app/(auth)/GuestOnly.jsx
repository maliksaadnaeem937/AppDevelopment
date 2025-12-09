import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useUser from "../../hooks/useUser";
import { router } from "expo-router";
import ThemedActivityIndicator from "../../components/ThemedActivityIndicator";
import ThemedView from "../../components/ThemedView";
const GuestOnly = ({ children }) => {
  const { authChecked, user } = useUser();

  useEffect(() => {
    if (authChecked && user) {
      router.replace("/profile");
    }
  }, [authChecked, user]);

  if (!authChecked || user) {
    return (
      <ThemedView
        safe={true}
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <ThemedActivityIndicator size={70} />
      </ThemedView>
    );
  }
  return children;
};

const styles = StyleSheet.create({});

export default GuestOnly;
