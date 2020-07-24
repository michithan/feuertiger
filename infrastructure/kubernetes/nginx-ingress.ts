import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';
import { transformation } from './transformation';

export const ingress = new k8s.helm.v3.Chart(
    'feuer-ingress',
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
                        // 'use-proxy-protocol': 'true'
                    }
                },
                service: {
                    type: 'LoadBalancer',
                    annotations: {
                        // 'service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol':
                        //     'true',
                        // 'service.beta.kubernetes.io/do-loadbalancer-hostname': hostname,
                        // 'service.beta.kubernetes.io/do-loadbalancer-tls-passthrough':
                        //     'true',
                        'service.beta.kubernetes.io/do-loadbalancer-name':
                            'feuer-loadbalancer'
                    },
                    externalTrafficPolicy: 'Local'
                    // loadBalancerIP
                },
                publishService: {
                    enabled: 'true'
                }
            }
        },
        transformations: [transformation('feuer-ingress')]
    },
    { provider, dependsOn: [provider] }
);

export const address = ingress.getResourceProperty(
    'v1/Service',
    'default',
    'nginx-ingress',
    'status'
).loadBalancer.ingress[0];