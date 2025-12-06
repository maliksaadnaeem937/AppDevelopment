import React, { useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedLink from "../../components/ThemedLink";
import ThemedPressable from "../../components/ThemedPressable";
import ThemedTextInput from "../../components/ThemedTextInput";
import { TouchableWithoutFeedback } from "react-native";
import useUser from "../../hooks/useUser";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {  register } = useUser();
  const handleSubmit = async () => {
    try {
      await register(email, password);
    } catch (error) {
      console.log(error.message);
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

        <ThemedPressable onPress={handleSubmit}>Register</ThemedPressable>

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
