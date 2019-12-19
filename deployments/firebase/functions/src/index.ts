import * as functions from 'firebase-functions';

import { gqlServer } from '@feuertiger/proxy-graphql';

const server = gqlServer();

export const helloWorld = functions.https.onRequest(server);
