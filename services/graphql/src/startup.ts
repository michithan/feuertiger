import firebase from 'firebase-admin';
import { firebaseAdminConfig, graphqlUri } from '@feuertiger/config';

import * as server from './server';

const [arg, number] = process.argv.slice(2);
const defaultPort = 4000;
const port = (arg === '--port' && number) || defaultPort;

firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAdminConfig)
});

server.gqlServer().listen({ port }, () =>
    // eslint-disable-next-line no-console
    console.log(
        `🚀 Server ready at ${
            port === defaultPort ? graphqlUri : `port ${port}`
        }`
    )
);
