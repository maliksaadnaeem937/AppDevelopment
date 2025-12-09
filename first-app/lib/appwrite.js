import { Client, Account, Databases, Avatars } from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6933c8c00039c7c24910")
  .setPlatform("dev.saad.shelfie");
export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export default client;
