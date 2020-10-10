import * as k8s from '@pulumi/kubernetes';
import { projectName } from '@feuertiger/config';

import { provider } from './provider';

export const ingress = new k8s.helm.v3.Chart(
    'ingress',
    {
        chart: 'ingress-nginx',
        version: '3.4.1',
        fetchOpts: {
            repo: 'https://kubernetes.github.io/ingress-nginx'
        },
        values: {
            controller: {
                kind: 'DaemonSet',
                hostPort: {
                    enabled: true
                },
                admissionWebhooks: {
                    enabled: false
                },
                config: {
                    'use-proxy-protocol': 'true',
                    'enable-real-ip': 'true'
                },
                service: {
                    annotations: {
                        'service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol':
                            'true',
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

export const address = ingress.getResource(
    'v1/Service',
    'ingress-ingress-nginx-controller'
).status.loadBalancer.ingress[0];
