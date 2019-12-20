import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

import { gqlServer } from '@feuertiger/proxy-graphql';

admin.initializeApp();

const server = gqlServer();

export const graphql = functions.https.onRequest(server);
