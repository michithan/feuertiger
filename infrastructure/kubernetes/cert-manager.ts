import * as path from 'path';
import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';
import { domain } from '../digitalocean/domain';

export const certNamespace = new k8s.core.v1.Namespace(
    'cert-manager-namespace',
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
                process.env.DIGITALOCEAN_TOKEN as string
            ).toString('base64')
        }
    },
    {
        provider,
        dependsOn: [certNamespace]
    }
);

export const cert = new k8s.helm.v3.Chart(
    'certificate',
    {
        chart: 'cert-manager',
        version: '1.0.2',
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
        namespace: 'cert-manager'
    },
    { provider, dependsOn: [certToken, certNamespace, domain] }
);

export const certClusterIssuer = new k8s.yaml.ConfigFile(
    'cluster-issuer-config',
    {
        file: path.resolve(__dirname, 'configs', 'production_issuer.yaml')
    },
    { provider }
);
