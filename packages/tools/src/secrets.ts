import { ServiceAccount } from 'firebase-admin';
import functions from 'firebase-functions';

import { getSecretsEnvironment } from './environment';

const getFirebaseConfig = () => {
    const config = functions && functions.config();
    const secrets = (config && config.secrets) || {};
    if (secrets) {
        return {
            projectId: secrets.projectid,
            privateKey: secrets.privatekey,
            clientEmail: secrets.clientemail,
            apiKey: secrets.apikey,
            authDomain: secrets.authdomain
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
    const { projectId, privateKey, clientEmail } = {
        projectId: FIREBASE_SECRETS_PROJECT_ID,
        privateKey: FIREBASE_SECRETS_PRIVATE_KEY,
        clientEmail: FIREBASE_SECRETS_CLIENT_EMAIL,
        ...getFirebaseConfig()
    };
    return { projectId, privateKey, clientEmail } as ServiceAccount;
};

export const getFirebaseAppSecrets = () => {
    const {
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_APIKEY
    } = getSecretsEnvironment();
    const { apiKey, authDomain } = {
        apiKey: FIREBASE_SECRETS_APP_APIKEY,
        authDomain: FIREBASE_SECRETS_APP_AUTHDOMAIN,
        ...getFirebaseConfig()
    };
    return { apiKey, authDomain };
};
