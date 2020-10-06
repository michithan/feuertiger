import firebase from 'firebase-admin';
import config from '@feuertiger/config';
import * as server from './server';

const [arg, number] = process.argv.slice(2);
const defaultPort = 4000;
const port = (arg === '--port' && number) || defaultPort;
const { firebaseAdminConfig, graphqlUri } = config;

try {
    firebase.initializeApp(firebaseAdminConfig);
    server.gqlServer().listen({ port }, () =>
        // eslint-disable-next-line no-console
        console.log(
            `🚀 Server ready at ${
                port === defaultPort ? graphqlUri : `port ${port}`
            }`
        )
    );
} catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
}
