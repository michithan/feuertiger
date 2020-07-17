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
    access: [
        // {
        //     cidr: '217.80.122.144/32'
        // }
        {
            cidr: '0.0.0.0/0'
        }
    ],
    cpu: '50m',
    memory: '20Mi',
    host: 'test.157.245.23.133.nip.io'
});
