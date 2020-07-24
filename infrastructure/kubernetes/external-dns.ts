import * as k8s from '@pulumi/kubernetes';

import { hostname } from '../digitalocean/hostname';
import { domain } from '../digitalocean/domain';
import { provider } from './provider';
import { transformation } from './transformation';

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
            domainFilters: [hostname]
        },
        transformations: [transformation('feuer-dns')]
    },
    { provider, dependsOn: [provider, domain] }
);
