import * as digitalocean from '@pulumi/digitalocean';
import * as k8s from '@pulumi/kubernetes';
import config from '@feuertiger/config';

const { digitaloceanToken, projectName } = config;
const name = `${projectName}-cluster`;

export const doProvider = new digitalocean.Provider(
    `${projectName}-cluster-provider`,
    {
        token: digitaloceanToken
    }
);

const cluster = digitalocean.getKubernetesCluster(
    {
        name
    },
    { provider: doProvider }
);

export const kubeconfig = cluster.then(
    ({ kubeConfigs: [{ rawConfig }] }) => rawConfig
);

export const provider = new k8s.Provider(name, {
    kubeconfig
});
