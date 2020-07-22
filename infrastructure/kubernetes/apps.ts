import * as path from 'path';
import * as k8s from '@pulumi/kubernetes';

import { domain, hostname } from '../digitalocean/domain';
import { provider } from './provider';

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
                        'use-forwarded-headers': 'true',
                        'use-proxy-protocol': 'true'
                    }
                },
                service: {
                    type: 'LoadBalancer',
                    annotations: {
                        'service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol':
                            'true',
                        'service.beta.kubernetes.io/do-loadbalancer-hostname': hostname,
                        'service.beta.kubernetes.io/do-loadbalancer-name':
                            'feuer-loadbalancer'
                    },
                    externalTrafficPolicy: 'Local'
                },
                publishService: {
                    enabled: 'true'
                }
            }
        }
    },
    { provider }
);

export const address = ingress.getResourceProperty(
    'v1/Service',
    'default',
    'feuer-ingress-nginx-ingress',
    'status'
).loadBalancer.ingress[0];

export const dns = new k8s.helm.v3.Chart(
    'feuer-dns',
    {
        chart: 'external-dns',
        fetchOpts: {
            repo: 'https://charts.bitnami.com/bitnami'
        },
        values: {
            rbac: {
                create: 'true',
                apiVersion: 'v1'
            },
            provider: 'digitalocean',
            digitalocean: {
                apiToken: process.env.DIGITALOCEAN_TOKEN
            },
            interval: '1m',
            policy: 'sync',
            domainFilters: [domain.name]
        }
    },
    { provider }
);

export const certConfig = new k8s.yaml.ConfigFile(
    'feuer-cert-config',
    {
        file:
            'https://github.com/jetstack/cert-manager/releases/download/v0.14.1/cert-manager.crds.yaml'
    },
    { provider }
);

export const certNamespace = new k8s.core.v1.Namespace(
    'cert-manager',
    { metadata: { name: 'cert-manager' } },
    { provider }
);

export const cert = new k8s.helm.v3.Chart(
    'feuer-cert',
    {
        chart: 'cert-manager',
        fetchOpts: {
            repo: 'https://charts.jetstack.io'
        },
        namespace: 'cert-manager'
    },
    { provider }
);

export const issuer = new k8s.yaml.ConfigFile(
    'issuer-config',
    {
        file: path.resolve(__dirname, 'configs', 'production_issuer.yaml')
    },
    { provider }
);
