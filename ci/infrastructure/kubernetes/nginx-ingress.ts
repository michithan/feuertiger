import * as k8s from '@pulumi/kubernetes';
import { projectName } from '@feuertiger/config';

import { provider } from './provider';

export const ingress = new k8s.helm.v3.Chart(
    'ingress',
    {
        chart: 'nginx-ingress',
        fetchOpts: {
            repo: 'https://helm.nginx.com/stable'
        },
        values: {
            controller: {
                // kind: 'DaemonSet',
                config: {
                    entries: {
                        'use-proxy-protocol': 'true'
                    }
                },
                service: {
                    annotations: {
                        // 'service.beta.kubernetes.io/do-loadbalancer-hostname': hostname,
                        // 'service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol':
                        //     'true',
                        'service.beta.kubernetes.io/do-loadbalancer-name': `${projectName}-loadbalancer`
                    },
                    externalTrafficPolicy: 'Local'
                },
                publishService: {
                    enabled: 'true'
                }
            }
        }
    },
    { provider, dependsOn: [provider] }
);

export const address = ingress.getResourceProperty(
    'v1/Service',
    'default',
    'ingress-nginx-ingress',
    'status'
).loadBalancer.ingress[0];
