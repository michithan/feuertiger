import path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const trim = (str: string | undefined): string | undefined =>
    str?.replace(/^"|"$/g, '');

export interface SecretsEnvironment {
    FIREBASE_SECRETS_TYPE?: string;
    FIREBASE_SECRETS_PROJECT_ID?: string;
    FIREBASE_SECRETS_PRIVATE_KEY_ID?: string;
    FIREBASE_SECRETS_PRIVATE_KEY?: string;
    FIREBASE_SECRETS_CLIENT_EMAIL?: string;
    FIREBASE_SECRETS_CLIENT_ID?: string;
    FIREBASE_SECRETS_AUTH_URI?: string;
    FIREBASE_SECRETS_TOKEN_URI?: string;
    FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL?: string;
    FIREBASE_SECRETS_CLIENT_X509_CERT_URL?: string;
    FIREBASE_SECRETS_APP_APIKEY?: string;
    FIREBASE_SECRETS_APP_AUTHDOMAIN?: string;
    FIREBASE_SECRETS_APP_DATABASEURL?: string;
    FIREBASE_SECRETS_APP_STORAGEBUCKET?: string;
    FIREBASE_SECRETS_APP_MESSAGINGSENDERID?: string;
    FIREBASE_SECRETS_APP_APPID?: string;
}

export const getSecretsEnvironment = (): SecretsEnvironment => {
    const {
        FIREBASE_SECRETS_TYPE,
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL,
        FIREBASE_SECRETS_CLIENT_ID,
        FIREBASE_SECRETS_AUTH_URI,
        FIREBASE_SECRETS_TOKEN_URI,
        FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL,
        FIREBASE_SECRETS_CLIENT_X509_CERT_URL,
        FIREBASE_SECRETS_APP_APIKEY,
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_DATABASEURL,
        FIREBASE_SECRETS_APP_STORAGEBUCKET,
        FIREBASE_SECRETS_APP_MESSAGINGSENDERID,
        FIREBASE_SECRETS_APP_APPID
    } = process.env;
    const secrets = {
        FIREBASE_SECRETS_TYPE,
        FIREBASE_SECRETS_PROJECT_ID,
        FIREBASE_SECRETS_PRIVATE_KEY_ID,
        FIREBASE_SECRETS_PRIVATE_KEY,
        FIREBASE_SECRETS_CLIENT_EMAIL,
        FIREBASE_SECRETS_CLIENT_ID,
        FIREBASE_SECRETS_AUTH_URI,
        FIREBASE_SECRETS_TOKEN_URI,
        FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL,
        FIREBASE_SECRETS_CLIENT_X509_CERT_URL,
        FIREBASE_SECRETS_APP_APIKEY,
        FIREBASE_SECRETS_APP_AUTHDOMAIN,
        FIREBASE_SECRETS_APP_DATABASEURL,
        FIREBASE_SECRETS_APP_STORAGEBUCKET,
        FIREBASE_SECRETS_APP_MESSAGINGSENDERID,
        FIREBASE_SECRETS_APP_APPID
    };

    return Object.keys(secrets).reduce(
        (acc: any, key: string): SecretsEnvironment => {
            acc[key] = trim(acc[key]);
            return acc;
        },
        { ...secrets }
    );
};
