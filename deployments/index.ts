import { deploy } from './kubernetes/deploy';

export const webClient = deploy({
    namespace: 'feuertiger',
    name: 'web-client',
    image: 'paulbouwer/hello-kubernetes:1.7',
    replicas: 1,
    ports: { http: 8080 },
    access: [
        {
            cidr: '217.80.121.233/32'
        }
        //    {
        //        cidr: '0.0.0.0/0'
        //    }
    ],
    env: {
        MESSAGE: 'Hello from the second deployment!'
    },
    cpu: '50m',
    memory: '20Mi',
    host: 'feuertiger.com'
});

export const test = deploy({
    namespace: 'feuertiger',
    name: 'test-web-client',
    image: 'paulbouwer/hello-kubernetes:1.7',
    replicas: 1,
    ports: { http: 8080 },
    access: [
        {
            cidr: '217.80.121.233/32'
        }
        //    {
        //        cidr: '0.0.0.0/0'
        //    }
    ],
    env: {
        MESSAGE: 'Hello from the second deployment!'
    },
    cpu: '50m',
    memory: '20Mi',
    host: 'test.feuertiger.com'
});
