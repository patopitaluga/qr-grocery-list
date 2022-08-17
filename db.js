import dotenv from 'dotenv';
dotenv.config();

import { initializeApp, } from 'firebase/app';

await initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
});
console.log('Firebase app initialized.');

import { getDatabase, } from 'firebase/database';

if (!process.env.DATABASEURL)          throw new Error('Missing "DATABASEURL" environment variable.');
if (!process.env.PROJECT_ID)           throw new Error('Missing "PROJECT_ID" environment variable.');
if (!process.env.PRIVATE_KEY_ID)       throw new Error('Missing "PRIVATE_KEY_ID" environment variable.');
if (!process.env.PRIVATE_KEY)          throw new Error('Missing "PRIVATE_KEY" environment variable.');
if (!process.env.CLIENT_EMAIL)         throw new Error('Missing "CLIENT_EMAIL" environment variable.');
if (!process.env.CLIENT_ID)            throw new Error('Missing "CLIENT_ID" environment variable.');
if (!process.env.CLIENT_X509_CERT_URL) throw new Error('Missing "CLIENT_X509_CERT_URL" environment variable.');

export const db = getDatabase();
