import admin, { ServiceAccount } from 'firebase-admin';
import * as functions from 'firebase-functions';

import { gqlServer } from '@feuertiger/proxy-graphql';
import serviceAccount from './secrets.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

const server = gqlServer();

export const graphql = functions.region('europe-west1').https.onRequest(server);

export const web = functions.region('europe-west1').https.onRequest(server);
