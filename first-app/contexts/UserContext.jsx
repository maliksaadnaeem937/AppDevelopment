import { createContext } from "react";
import { useState } from "react";

import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { Alert } from "react-native";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      console.log("response = ", response);
      setUser(response);
    } catch (error) {
      console.log(error.message);
      Alert.alert("Title", "This is the message");
    }
  };
  const register = async (email, password) => {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {};

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
