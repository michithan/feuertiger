import * as digitalocean from '@pulumi/digitalocean';
import config from '@feuertiger/config';

import { provider } from './provider';
import { vpc } from './vpc';
import { droplet } from './droplet';

const name = `${config.projectName}-cluster`;

export const cluster = new digitalocean.KubernetesCluster(
    name,
    {
        name,
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
        version: '1.18.8-do.1'
    },
    {
        provider,
        dependsOn: [vpc, droplet],
        customTimeouts: { create: '30m' }
    }
);

export const kubeconfig = cluster.kubeConfigs.apply(([kc]) => kc);

export const cert = kubeconfig.apply(kc => {
    const base64Cert = kc.clusterCaCertificate;
    return Buffer.from(base64Cert, 'base64').toString('ascii');
});

export const token = kubeconfig.apply(({ token: kubeToken }) => kubeToken);
