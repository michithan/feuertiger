import {
    projectName,
    firebaseAppConfig,
    postgresUser,
    postgresPassword,
    env,
    git
} from '@feuertiger/config';

import { service } from './kubernetes/service';
import { ingress } from './kubernetes/ingress';

const { branchSlug } = git;
const { GOOGLE_CREDENTIALS } = env;

const namespace = `${branchSlug}-${projectName}`;
const subDomainPrefix = branchSlug === 'main' ? '' : `${branchSlug}.`;

export const webClient = service({
    namespace,
    name: 'web-client',
    image:
        'registry.gitlab.com/feuertiger/feuertiger/feuertiger-web-client:latest',
    minReplicas: 1,
    ports: { http: 8080 },
    env: {
        DEPLOY_DATE: new Date().toISOString(),
        FIREBASE_CONFIG: JSON.stringify(firebaseAppConfig, null, 2),
        GRAPHQL_URI: '/graphql'
    },
    cpu: 50,
    memory: 100
});

export const webApi = service({
    namespace,
    name: 'graphql',
    image:
        'registry.gitlab.com/feuertiger/feuertiger/feuertiger-graphql:latest',
    minReplicas: 1,
    ports: { http: 8080 },
    env: {
        DEPLOY_DATE: new Date().toISOString(),
        GOOGLE_CREDENTIALS,
        POSTGRES_URI: `postgresql://${postgresUser}:${postgresPassword}@postgres.${namespace}:5432/feuertiger`
    },
    cpu: 50,
    memory: 200
});

export const db = service({
    namespace,
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

export const mainIngress = ingress({
    namespace,
    host: `${subDomainPrefix}feuertiger.com`,
    paths: [
        {
            path: '/',
            serviceName: webClient.name,
            servicePort: webClient.ports.http
        },
        {
            path: '/graphql',
            serviceName: webApi.name,
            servicePort: webApi.ports.http
        }
    ]
});
