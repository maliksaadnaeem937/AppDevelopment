import React from "react";
import useUser from "../../hooks/useUser";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedPressable from "../../components/ThemedPressable";
import Toast from "react-native-toast-message";
import { useState } from "react";
import ThemedActivityIndicator from "../../components/ThemedActivityIndicator";

const Profile = () => {
  const { logout, user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      router.replace("/login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error occured",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.title}>
        {user.email}
      </ThemedText>
      <ThemedText style={styles.text}>
        Time to start reading some books....
      </ThemedText>
      {loading ? (
        <ThemedActivityIndicator size={40} />
      ) : (
        <ThemedPressable onPress={handleLogout} disabled={loading}>
          Logout
        </ThemedPressable>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default Profile;
