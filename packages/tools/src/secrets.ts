import { ServiceAccount } from 'firebase-admin';
import functions from 'firebase-functions';

import { getSecretsEnvironment, SecretsEnvironment } from './environment';

const config = (functions && functions.config()) || {};

export const getFirebaseAdminSecrets = () => {
    const {
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL
    } = {
        ...getSecretsEnvironment(),
        ...config
    } as SecretsEnvironment;

    const secrets: ServiceAccount = {
        projectId: FIREBASE_SECRETS_PROJECT_ID,
        privateKey: FIREBASE_SECRETS_PRIVATE_KEY,
        clientEmail: FIREBASE_SECRETS_CLIENT_EMAIL
    };
    return secrets;
};

export const getFirebaseAppSecrets = () => {
    const { FIREBASE_SECRETS_APP_AUTHDOMAIN, FIREBASE_SECRETS_APP_APIKEY } = {
        ...getSecretsEnvironment(),
        ...config
    } as SecretsEnvironment;

    const tokens = {
        apiKey: FIREBASE_SECRETS_APP_APIKEY,
        authDomain: FIREBASE_SECRETS_APP_AUTHDOMAIN
    };

    return tokens;
};
