import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';
import { vpc } from './vpc';
import { droplet } from './droplet';

export const cluster = new digitalocean.KubernetesCluster(
    'feuer-cluster',
    {
        name: 'feuer-cluster',
        vpcUuid: vpc.id,
        nodePool: {
            name: droplet.name,
            tags: [droplet.id],
            size: digitalocean.DropletSlugs.DropletS1VCPU2GB,
            autoScale: true,
            minNodes: 1,
            maxNodes: 2
        },
        region: digitalocean.Regions.FRA1,
        version: '1.18.6-do.0'
    },
    {
        provider,
        dependsOn: [vpc, droplet],
        customTimeouts: { create: '30m' }
    }
);

export const kubeconfig = cluster.kubeConfigs.apply(([config]) => config);

export const cert = kubeconfig.apply((config) => {
    const base64Cert = config.clusterCaCertificate;
    return Buffer.from(base64Cert, 'base64').toString('ascii');
});

export const token = kubeconfig.apply((config) => config.token);
