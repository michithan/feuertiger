import { ServiceAccount } from 'firebase-admin';
import functions from 'firebase-functions';

import { getSecretsEnvironment } from './environment';

const getFirebaseConfig = () => {
    const config =
        functions && functions.config() && functions.config().secrets;
    if (config) {
        return {
            projectId: config.projectid,
            privateKey: config.privatekey,
            clientEmail: config.clientemail,
            apiKey: config.apikey,
            authDomain: config.authdomain
        };
    }
    return {};
};

export const getFirebaseAdminSecrets = () => {
    const {
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL
    } = getSecretsEnvironment();

    const secrets: ServiceAccount = {
        projectId: FIREBASE_SECRETS_PROJECT_ID,
        privateKey: FIREBASE_SECRETS_PRIVATE_KEY,
        clientEmail: FIREBASE_SECRETS_CLIENT_EMAIL,
        ...getFirebaseConfig()
    };
    return secrets;
};

export const getFirebaseAppSecrets = () => {
    const {
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_APIKEY
    } = getSecretsEnvironment();

    const tokens = {
        apiKey: FIREBASE_SECRETS_APP_APIKEY,
        authDomain: FIREBASE_SECRETS_APP_AUTHDOMAIN,
        ...getFirebaseConfig()
    };

    return tokens;
};
