import config from '@feuertiger/config';

import { deploy } from './kubernetes/deploy';

const {
    firebaseAppConfig,
    firebaseAdminConfig,
    postgresUser,
    postgresPassword
} = config;

export const webClient = deploy({
    namespace: config.projectName,
    name: 'web-client',
    image:
        'registry.gitlab.com/feuertiger/feuertiger/feuertiger-web-client:latest',
    minReplicas: 1,
    ports: { http: 8080 },
    env: {
        DEPLOY_DATE: new Date().toISOString(),
        FIREBASE_CONFIG: JSON.stringify(firebaseAppConfig, null, 2),
        GRAPHQL_URI: 'https://api.dev.feuertiger.com/graphql'
    },
    cpu: 50,
    memory: 100,
    host: 'dev.feuertiger.com'
});

export const webApi = deploy({
    namespace: config.projectName,
    name: 'graphql',
    image:
        'registry.gitlab.com/feuertiger/feuertiger/feuertiger-graphql:latest',
    minReplicas: 1,
    ports: { http: 8080 },
    env: {
        DEPLOY_DATE: new Date().toISOString(),
        GOOGLE_CREDENTIALS: JSON.stringify(firebaseAdminConfig, null, 2),
        POSTGRES_URI: `postgresql://${postgresUser}:${postgresPassword}@postgres:5432/feuertiger`
    },
    cpu: 50,
    memory: 100,
    host: 'api.dev.feuertiger.com'
});

export const db = deploy({
    namespace: config.projectName,
    name: 'postgres',
    image: 'postgres:13',
    minReplicas: 1,
    ports: { tcp: 5432 },
    env: {
        POSTGRES_DB: 'feuertiger',
        POSTGRES_USER: postgresUser,
        POSTGRES_PASSWORD: postgresPassword
    },
    cpu: 50,
    memory: 100
});
