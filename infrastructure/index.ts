import * as firebaseProject from './firebase/project';
import * as firebaseWebApp from './firebase/webApp';

import * as vpc from './digitalocean/vpc';
import * as cluster from './digitalocean/cluster';

import * as gitlab from './gitlab/cluster';

import * as deployments from './kubernetes/deployments';
import * as namespaces from './kubernetes/namespaces';

export const firebaseProjectName = firebaseProject.project.project;
export const firebaseWebAppName = firebaseWebApp.webApp.displayName;

export const vpcName = vpc.vpc.name;
export const clusterName = cluster.cluster.name;

export const gitlabProject = gitlab.gitlabProject.name;
export const gitlabClusterName = gitlab.gitlabCluster.name;

export const webService = deployments.service.metadata.name;
export const webServiceHostname =
    deployments.service.status.loadBalancer.ingress[0].hostname;

export const devNamespaceName = namespaces.dev.urn;
