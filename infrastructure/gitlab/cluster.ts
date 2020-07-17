import * as gitlab from '@pulumi/gitlab';

import { cluster as doCluster, token, cert } from '../digitalocean/cluster';
import { project } from './project';

export const cluster = new gitlab.ProjectCluster('feuer-cluster', {
    name: 'feuer-cluster',
    enabled: true,
    environmentScope: '*',
    domain: doCluster.ipv4Address.apply((ip) => `${ip}.nip.io`),
    kubernetesApiUrl: doCluster.endpoint,
    kubernetesCaCert: cert,
    managed: true,
    managementProjectId: project.id,
    kubernetesToken: token,
    project: project.id
});
