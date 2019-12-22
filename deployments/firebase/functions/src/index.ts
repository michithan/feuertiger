import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { gqlServer } from '@feuertiger/proxy-graphql';
import './secrets.json';

const serviceAccountPath = require.resolve('./secrets.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
});

const server = gqlServer();

export const graphql = functions.region('europe-west1').https.onRequest(server);

export const web = functions.region('europe-west1').https.onRequest(server);
