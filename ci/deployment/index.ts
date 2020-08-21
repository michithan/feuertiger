import { projectName } from '@feuertiger/config';

import { deploy } from './kubernetes/deploy';

export const webClient = deploy({
    namespace: projectName,
    name: 'web-client',
    image: 'paulbouwer/hello-kubernetes:1.7',
    minReplicas: 1,
    ports: { http: 8080 },
    env: {
        MESSAGE: 'Hello from the first deployment!'
    },
    cpu: 50,
    memory: 100,
    host: 'feuertiger.com'
});

export const test = deploy({
    namespace: projectName,
    name: 'graphql',
    image: 'paulbouwer/hello-kubernetes:1.7',
    minReplicas: 1,
    ports: { http: 8080 },
    env: {
        MESSAGE: 'Hello from the second deployment!'
    },
    cpu: 50,
    memory: 100,
    host: 'test.feuertiger.com'
});
