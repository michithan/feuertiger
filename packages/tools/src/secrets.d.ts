import { ServiceAccount } from 'firebase-admin';

export interface Config extends ServiceAccount {
    [key: string]: string | undefined;
}

export const getFirebaseAdminSecrets: () => Config;

export const getFirebaseAppSecrets: () => any;
