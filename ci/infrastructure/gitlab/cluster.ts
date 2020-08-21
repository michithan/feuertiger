import * as gitlab from '@pulumi/gitlab';
import { projectName } from '@feuertiger/config';

import { cluster as doCluster, token, cert } from '../digitalocean/cluster';
import { hostname } from '../digitalocean/hostname';
import { project } from './project';
import { provider } from './provider';

const name = `${projectName}-cluster`;

export const cluster = new gitlab.ProjectCluster(
    name,
    {
        name,
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
    { provider, dependsOn: [project, doCluster] }
);
