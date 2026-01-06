import { createContext, useEffect } from "react";
import { useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { DATABASE_ID, USERS_COLLECTION_ID, databases } from "../lib/appwrite";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    const response = await account.get();
    setUser(response);
  };

  const createUser = async (username, userId) => {
    try {
      databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, ID.unique(), {
        username,
        userId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const register = async (email, password, username) => {
    const U_ID = ID.unique();
    await account.create(U_ID, email, password);
    await login(email, password);
    createUser(username, U_ID);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const getInitialUserValue = async () => {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };
  useEffect(() => {
    getInitialUserValue();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
};
