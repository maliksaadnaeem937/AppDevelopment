import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useUser() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("Using user  context outside");
  }
  return userContext;
}
