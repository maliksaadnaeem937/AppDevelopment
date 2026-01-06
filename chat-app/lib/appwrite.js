import { Client, Account, Databases, Avatars } from "react-native-appwrite";

const client = new Client();

client.setEndpoint("").setProject("").setPlatform("");
export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const USERS_COLLECTION_ID = "";
export const MESSAGES_COLLECTION_ID = "";
export const BOOKS_COLLECTION_ID = "";
export const DATABASE_ID = "";

export default client;
