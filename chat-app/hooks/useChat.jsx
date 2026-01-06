import React, { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

export default function useChat() {
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error("Using chat context out of scope");
  }
  return chatContext;
}
