import * as firebaseProject from './firebase/project';
import * as firebaseWebApp from './firebase/webApp';

import * as vpc from './digitalocean/vpc';
import * as cluster from './digitalocean/cluster';

import * as apps from './kubernetes/apps';

import * as integration from './gitlab/cluster';
import * as project from './gitlab/project';

export const firebaseProjectName = firebaseProject.project.project;
export const firebaseWebAppName = firebaseWebApp.webApp.displayName;

export const vpcName = vpc.vpc.name;
export const clusterName = cluster.cluster.name;

export const { ip } = apps.ingress.getResourceProperty(
    'v1/Service',
    'default',
    'feuer-ingress-nginx-ingress',
    'status'
).loadBalancer.ingress[0];

export const gitlabProject = project.project.name;
export const gitlabClusterName = integration.cluster.name;
