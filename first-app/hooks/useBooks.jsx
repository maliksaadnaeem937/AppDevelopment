import React, { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export default function useBooks() {
  const booksContext = useContext(BooksContext);
  if (!booksContext) {
    throw new Error("Using context out of scope");
  }
  return booksContext;
}
