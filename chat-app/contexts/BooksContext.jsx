import { createContext, useEffect, useState } from "react";
import { account, databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useCallback } from "react";
import client from "../lib/appwrite";

import React from "react";

export const BooksContext = createContext();
import useUser from "../hooks/useUser";

const DATABASE_ID = "6936c253001ae7a7c240";
const COLLECTION_ID = "6936c27d00112ad6267c";
export default function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  const fetchBooks = useCallback(async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userId", user.$id),
    ]);
    setBooks(response.documents);
    console.log(response.documents);
  }, [user?.$id, databases]);

  const fetchBookById = useCallback(
    async (id) => {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      return response;
    },
    [databases]
  );

  const createBook = useCallback(
    async (data) => {
      databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          userId: user.$id,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
    },
    [user?.$id, databases]
  );

  const deleteBook = useCallback(
    async (id) => {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    },
    [databases]
  );

  useEffect(() => {
    let unsubscribe;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;
    if (user) {
      fetchBooks();
      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;
        if (events[0].includes("create")) {
          setBooks((prev) => [payload, ...prev]);
        } else if (events[0].includes("delete")) {
          setBooks((prev) => prev.filter((item) => item.$id != payload.$id));
        }
      });
      console.log(books);
    } else {
      setBooks([]);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, fetchBooks]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
