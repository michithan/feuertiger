import * as digitalocean from '@pulumi/digitalocean';

const cluster = new digitalocean.KubernetesCluster('foo', {
    nodePool: {
        name: 'worker-pool',
        nodeCount: 3,
        size: 's-2vcpu-2gb'
    },
    region: 'nyc1',
    version: '1.15.5-do.1'
});
