import * as digitalocean from '@pulumi/digitalocean';
import * as k8s from '@pulumi/kubernetes';

const cluster = digitalocean.getKubernetesCluster({
    name: 'feuer-cluster-bebe0df'
});

export const kubeconfig = cluster.then(
    ({ kubeConfigs: [config] }) => config.rawConfig
);

export const provider = new k8s.Provider('feuer-cluster', {
    kubeconfig
});
