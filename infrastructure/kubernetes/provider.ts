import * as k8s from '@pulumi/kubernetes';
import { kubeconfig, cluster } from '../digitalocean/cluster';

export const provider = new k8s.Provider(
    'feuer-cluster',
    {
        kubeconfig: kubeconfig.rawConfig
    },
    { dependsOn: [cluster] }
);
