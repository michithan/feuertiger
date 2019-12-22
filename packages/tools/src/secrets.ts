import functions from 'firebase-functions';

import { getSecretsEnvironment } from './environment';

interface Config {
    [key: string]: string | undefined;
}

const AddFirebaseConfig = (config: Config): Config => {
    const secrets = functions?.config()?.secrets;
    const firebaseConfig: Config = {
        projectId: secrets?.projectid,
        privateKey: secrets?.privatekey,
        clientEmail: secrets?.clientemail,
        apiKey: secrets?.apikey,
        authDomain: secrets?.authdomain
    };
    const nextConfig: Config = { ...config };
    Object.keys(nextConfig).forEach((key: string) => {
        if (firebaseConfig[key]) {
            nextConfig[key.toString()] = firebaseConfig[key];
        }
    });
    return nextConfig;
};

export const getFirebaseAdminSecrets = () => {
    const {
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL
    } = getSecretsEnvironment();
    return AddFirebaseConfig({
        projectId: FIREBASE_SECRETS_PROJECT_ID,
        privateKey: FIREBASE_SECRETS_PRIVATE_KEY,
        clientEmail: FIREBASE_SECRETS_CLIENT_EMAIL
    });
};

export const getFirebaseAppSecrets = () => {
    const {
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_APIKEY
    } = getSecretsEnvironment();
    return AddFirebaseConfig({
        apiKey: FIREBASE_SECRETS_APP_APIKEY,
        authDomain: FIREBASE_SECRETS_APP_AUTHDOMAIN
    });
};
