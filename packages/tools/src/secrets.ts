import functions from 'firebase-functions';
import { ServiceAccount } from 'firebase-admin';

import { getSecretsEnvironment } from './environment';

interface Config extends ServiceAccount {
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
            nextConfig[key] = firebaseConfig[key];
        }
    });
    return nextConfig;
};

export const getFirebaseAdminSecrets = (): Config => {
    const {
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL
    } = getSecretsEnvironment();
    const config = AddFirebaseConfig({
        projectId: FIREBASE_SECRETS_PROJECT_ID,
        privateKey: FIREBASE_SECRETS_PRIVATE_KEY,
        clientEmail: FIREBASE_SECRETS_CLIENT_EMAIL
    });
    return {
        projectId: config.projectId,
        privateKey: config.privateKey,
        clientEmail: config.clientEmail,
        project_id: config.projectId,
        private_key: config.privateKey,
        client_email: config.clientEmail
    };
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
