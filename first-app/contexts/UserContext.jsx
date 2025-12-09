import { createContext, useEffect } from "react";
import { useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    const response = await account.get();
    setUser(response);
  };
  const register = async (email, password) => {
    await account.create(ID.unique(), email, password);
    await login(email, password);
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
