import * as gitlab from '@pulumi/gitlab';

import { cluster as doCluster, token, cert } from '../digitalocean/cluster';
import { project } from './project';

export const cluster = new gitlab.ProjectCluster('feuer-cluster', {
    enabled: true,
    environmentScope: '*',
    kubernetesApiUrl: doCluster.endpoint,
    kubernetesCaCert: cert,
    managed: true,
    managementProjectId: project.id,
    kubernetesToken: token,
    project: project.id
});
