import { deploy } from './kubernetes/deploy';

export const { name, namespace, hostNames, ips } = deploy({
    namespace: 'feuertiger',
    name: 'web-client',
    image: 'tutum/hello-world:latest',

    replicas: 1,
    ports: [
        {
            intern: 80,
            extern: 80
        }
    ],
    cpu: '50m',
    memory: '20Mi',
    host: 'test.159.89.212.130.nip.io'
});
