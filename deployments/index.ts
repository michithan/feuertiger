import { deploy } from './kubernetes/deploy';

export const { name, namespace, hostNames, ips } = deploy({
    namespace: 'feuertiger',
    name: 'web-client',
    image: 'paulbouwer/hello-kubernetes:1.7',
    replicas: 1,
    ports: [
        {
            intern: 8080,
            extern: 80
        }
    ],
    access: [
        {
            cidr: '217.80.124.125/32'
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
