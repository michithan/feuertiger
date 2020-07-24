import * as gitlab from '@pulumi/gitlab';

import { cluster as doCluster, token, cert } from '../digitalocean/cluster';
import { hostname } from '../digitalocean/hostname';
import { project } from './project';

export const cluster = new gitlab.ProjectCluster(
    'feuer-cluster',
    {
        name: 'feuer-cluster',
        enabled: true,
        environmentScope: '*',
        domain: hostname,
        kubernetesApiUrl: doCluster.endpoint,
        kubernetesCaCert: cert,
        managed: true,
        managementProjectId: project.id,
        kubernetesToken: token,
        project: project.id
    },
    { dependsOn: [project, doCluster] }
);
