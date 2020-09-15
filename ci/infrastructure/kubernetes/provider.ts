import * as k8s from '@pulumi/kubernetes';
import config from '@feuertiger/config';

import { kubeconfig, cluster } from '../digitalocean/cluster';

const name = `${config.projectName}-cluster`;

export const provider = new k8s.Provider(
    name,
    {
        kubeconfig: kubeconfig.rawConfig
    },
    { dependsOn: [cluster] }
);
