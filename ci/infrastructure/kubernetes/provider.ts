import * as k8s from '@pulumi/kubernetes';
import { projectName } from '@feuertiger/config';

import { kubeconfig, cluster } from '../digitalocean/cluster';

const name = `${projectName}-cluster`;

export const provider = new k8s.Provider(
    name,
    {
        kubeconfig: kubeconfig.rawConfig
    },
    { dependsOn: [cluster] }
);
