import * as functions from 'firebase-functions';

import { gqlServer } from '@feuertiger/proxy-graphql';

const server = gqlServer();

export const graphql = functions.region('europe-west1').https.onRequest(server);

export const web = functions.region('europe-west1').https.onRequest(server);
