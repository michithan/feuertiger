import * as gitlab from '@pulumi/gitlab';
import { cluster, token, cert } from '../digitalocean/cluster';

export const gitlabProject = gitlab.Project.get('feuertiger', '18726494');

export const gitlabCluster = new gitlab.ProjectCluster('feuer-cluster', {
    enabled: true,
    environmentScope: '*',
    kubernetesApiUrl: cluster.endpoint,
    kubernetesCaCert: cert,
    managed: true,
    managementProjectId: gitlabProject.id,
    kubernetesToken: token,
    project: gitlabProject.id
});
