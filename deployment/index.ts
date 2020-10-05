import config from '@feuertiger/config';

import { deploy } from './kubernetes/deploy';

const { firebaseAdminConfig, postgresUser, postgresPassword } = config;

export const webClient = deploy({
    namespace: config.projectName,
    name: 'web-client',
    image: 'registry.gitlab.com/feuertiger/feuertiger/dev-environment:latest',
    minReplicas: 1,
    ports: { http: 8080 },
    env: {
        FIREBASE_CONFIG: JSON.stringify(config.firebaseAdminConfig),
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
        GOOGLE_CREDENTIALS: JSON.stringify(firebaseAdminConfig),
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
        POSTGRES_USER: postgresUser,
        POSTGRES_PASSWORD: postgresPassword
    },
    cpu: 50,
    memory: 100
});
