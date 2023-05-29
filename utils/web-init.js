import { Client, Account, Databases } from "appwrite";

export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646d59d17780d087bad2");

export const createAnonymousSession = async () => {
  try {
    await account.createAnonymousSession();
  } catch (err) {
    console.log(err);
  }
};
