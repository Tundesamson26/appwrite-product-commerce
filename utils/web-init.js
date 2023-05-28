import { Client, Account } from 'appwrite';

export const client = new Client();
export const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('646d59d17780d087bad2');