import React, { useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedLink from "../../components/ThemedLink";
import ThemedPressable from "../../components/ThemedPressable";
import ThemedTextInput from "../../components/ThemedTextInput";
import { TouchableWithoutFeedback } from "react-native";
import useUser from "../../hooks/useUser";
import Toast from "react-native-toast-message";
import ThemedActivityIndicator from "../../components/ThemedActivityIndicator";
import { APPWRITE_ERROR_MESSAGES } from "../../constants/AppwriteErrors";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useUser();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await register(email, password);

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Registration Succesful!.",
        position: "bottom",
        visibilityTime: 1000,
      });
    } catch (error) {
      const message =
        APPWRITE_ERROR_MESSAGES[error.message] ||
        APPWRITE_ERROR_MESSAGES["default"];
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: message,
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.title]} title={true}>
          Register For an Account!
        </ThemedText>
        <ThemedTextInput
          placeholder="Email"
          style={{ width: "80%" }}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <ThemedTextInput
          placeholder="Password"
          style={{ width: "80%" }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        {loading ? (
          <ThemedActivityIndicator size={40} />
        ) : (
          <ThemedPressable onPress={handleSubmit} disabled={loading}>
            Register
          </ThemedPressable>
        )}

        <ThemedLink href={"login"}>Login Here</ThemedLink>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Register;
