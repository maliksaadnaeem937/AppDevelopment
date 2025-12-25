import { Client, Account, Databases, Avatars } from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6933c8c00039c7c24910")
  .setPlatform("dev.saad.shelfie");
export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const USERS_COLLECTION_ID = "users";
export const MESSAGES_COLLECTION_ID = "messages";
export const BOOKS_COLLECTION_ID = "6936c27d00112ad6267c";
export const DATABASE_ID = "6936c253001ae7a7c240";

export default client;
