import * as k8s from '@pulumi/kubernetes';

import { hostname } from '../digitalocean/hostname';
import { domain } from '../digitalocean/domain';
import { provider } from './provider';

export const dns = new k8s.helm.v3.Chart(
    'dns',
    {
        chart: 'external-dns',
        version: '3.4.3',
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
            domainFilters: [hostname]
        }
    },
    { provider, dependsOn: [provider, domain] }
);
