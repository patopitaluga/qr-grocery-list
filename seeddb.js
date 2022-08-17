import dotenv from 'dotenv';
dotenv.config();

import { initializeApp, } from 'firebase-admin/app';
import { getDatabase, } from 'firebase-admin/database';
import admin from 'firebase-admin';

if (!process.env.DATABASEURL)          throw new Error('Missing "DATABASEURL" environment variable.');
if (!process.env.PROJECT_ID)           throw new Error('Missing "PROJECT_ID" environment variable.');
if (!process.env.PRIVATE_KEY_ID)       throw new Error('Missing "PRIVATE_KEY_ID" environment variable.');
if (!process.env.PRIVATE_KEY)          throw new Error('Missing "PRIVATE_KEY" environment variable.');
if (!process.env.CLIENT_EMAIL)         throw new Error('Missing "CLIENT_EMAIL" environment variable.');
if (!process.env.CLIENT_ID)            throw new Error('Missing "CLIENT_ID" environment variable.');
if (!process.env.CLIENT_X509_CERT_URL) throw new Error('Missing "CLIENT_X509_CERT_URL" environment variable.');

const app = initializeApp({
  databaseURL: process.env.DATABASEURL,
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  }),
});

const db = getDatabase();

const itemsRef = db.ref('/items/' + process.env.DEMO_USER_UID);

const newItemRef1 = itemsRef.push();
newItemRef1.set({
  title: 'Azucar',
  description: 'Azucar Ledezma 1kg',
  instock: true,
});
const newItemRef2 = itemsRef.push();
newItemRef2.set({
  title: 'Mayonesa',
  description: 'Hellmans 300g',
  instock: true,
});
const newItemRef3 = itemsRef.push();
newItemRef3.set({
  title: 'Shampoo',
  description: 'Head and shoulders para cabellos grasos',
  instock: true,
});

itemsRef.on('value', (snapshot) => {
  console.log(snapshot.val());
  console.log('Seed done');
  app.delete(); // Release resources
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});
