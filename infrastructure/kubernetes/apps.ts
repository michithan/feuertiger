import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';

export const ingress = new k8s.helm.v3.Chart(
    'feuer-ingress',
    {
        chart: 'nginx-ingress',
        fetchOpts: {
            repo: 'https://helm.nginx.com/stable'
        },
        namespace: 'default',
        values: {
            controller: {
                config: {
                    entries: {
                        'use-proxy-protocol': 'true'
                    }
                },
                service: {
                    annotations: {
                        'service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol':
                            'true'
                    }
                }
            }
        }
    },
    { provider }
);

export const { ip } = ingress.getResourceProperty(
    'v1/Service',
    'default',
    'feuer-ingress-nginx-ingress',
    'status'
).loadBalancer.ingress[0];
