import { Client, Account, Databases, Avatars } from "react-native-appwrite";

const client = new Client();


export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export default client;
