import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';
import { dev as devNamespace } from './namespaces';
// import { gitlabRegistrySecret } from './secrets';

const appLabels = { appClass: 'feuertiger-app' };

const webServiceName = 'feuertiger-web';

export const deployment = new k8s.apps.v1.Deployment(
    'nginx',
    {
        metadata: {
            labels: appLabels,
            namespace: devNamespace.metadata.name
        },
        spec: {
            replicas: 1,
            selector: { matchLabels: appLabels },
            template: {
                metadata: { labels: appLabels },
                spec: {
                    // imagePullSecrets: [
                    //   { name: gitlabRegistrySecret.metadata.apply((m) => m.name) },
                    // ],
                    containers: [
                        {
                            name: 'nginx',
                            image: 'nginx:latest',
                            ports: [{ name: 'http', containerPort: 80 }]
                        }
                    ]
                }
            }
        }
    },
    {
        provider
    }
);

export const service = new k8s.core.v1.Service(
    webServiceName,
    {
        metadata: {
            labels: appLabels,
            namespace: devNamespace.metadata.name
        },
        spec: {
            type: 'LoadBalancer',
            ports: [{ port: 80, targetPort: 'http' }],
            selector: appLabels
        }
    },
    {
        provider
    }
);
