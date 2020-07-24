import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';
import { transformation } from './transformation';

export const certNamespace = new k8s.core.v1.Namespace(
    'cert-manager',
    {
        metadata: {
            name: 'cert-manager',
            labels: { 'certmanager.k8s.io/disable-validation': 'true' }
        }
    },
    { provider, dependsOn: [provider] }
);

export const certToken = new k8s.core.v1.Secret(
    'digitalocean-dns',
    {
        apiVersion: 'v1',
        metadata: {
            name: 'digitalocean-dns',
            namespace: 'cert-manager'
        },
        data: {
            'access-token': Buffer.from(
                process.env.DIGITALOCEAN_TOKEN
            ).toString('base64')
        }
    },
    {
        provider,
        dependsOn: [certNamespace]
    }
);

export const cert = new k8s.helm.v3.Chart(
    'feuer-cert',
    {
        chart: 'cert-manager',
        fetchOpts: {
            repo: 'https://charts.jetstack.io'
        },
        values: {
            installCRDs: 'true',
            ingressShim: {
                defaultACMEChallengeType: 'dns01',
                defaultACMEDNS01ChallengeProvider: 'digitalocean',
                defaultIssuerName: 'letsencrypt-prod',
                defaultIssuerKind: 'ClusterIssuer'
            }
        },
        version: 'v0.16.0',
        namespace: 'cert-manager',
        transformations: [transformation('feuer-cert')]
    },
    { provider, dependsOn: [certToken, certNamespace] }
);
