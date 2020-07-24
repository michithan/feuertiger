import * as firebaseProject from './firebase/project';
import * as firebaseWebApp from './firebase/webApp';

import * as doProject from './digitalocean/project';
import * as vpc from './digitalocean/vpc';
import * as cluster from './digitalocean/cluster';

import * as apps from './kubernetes/apps';

import * as gitlabIntegration from './gitlab/cluster';
import * as gitlabProject from './gitlab/project';

export const firebaseProjectName = firebaseProject.project.project;
export const firebaseWebAppName = firebaseWebApp.webApp.displayName;

export const doProjectName = doProject.project.name;
export const vpcName = vpc.vpc.name;
export const clusterName = cluster.cluster.name;

export const { hostname, ip } = apps.address;
export const dns = apps.dns.urn;
export const certNamespace = apps.certNamespace.metadata.name;
export const certToken = apps.certToken.urn;
export const cert = apps.cert.urn;

export const gitlabProjectName = gitlabProject.project.name;
export const gitlabClusterName = gitlabIntegration.cluster.name;
