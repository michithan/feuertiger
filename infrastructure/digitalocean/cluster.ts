import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';
import { vpc } from './vpc';

export const cluster = new digitalocean.KubernetesCluster(
    'feuer-cluster',
    {
        vpcUuid: vpc.id,
        nodePool: {
            name: 'feuer-worker-pool',
            size: 's-1vcpu-2gb',
            autoScale: true,
            minNodes: 1,
            maxNodes: 2
        },
        region: 'fra1',
        version: '1.18.3-do.0'
    },
    {
        provider
    }
);

export const kubeconfig = cluster.kubeConfigs.apply(([config]) => config);

export const cert = kubeconfig.apply((config) => {
    const base64Cert = config.clusterCaCertificate;
    return Buffer.from(base64Cert, 'base64').toString('ascii');
});

export const token = kubeconfig.apply((config) => config.token);
