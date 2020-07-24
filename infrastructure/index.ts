import * as firebaseProject from './firebase/project';
import * as firebaseWebApp from './firebase/webApp';

import * as doProject from './digitalocean/project';
import * as vpc from './digitalocean/vpc';
import * as cluster from './digitalocean/cluster';

import * as nginxIngress from './kubernetes/nginx-ingress';
import * as externalDns from './kubernetes/external-dns';
import * as certManager from './kubernetes/cert-manager';

import * as gitlabIntegration from './gitlab/cluster';
import * as gitlabProject from './gitlab/project';

export const firebaseProjectName = firebaseProject.project.project;
export const firebaseWebAppName = firebaseWebApp.webApp.displayName;

export const doProjectName = doProject.project.name;
export const vpcName = vpc.vpc.name;
export const clusterName = cluster.cluster.name;

export const { hostname, ip } = nginxIngress.address;

export const dns = externalDns.dns.urn;

export const certNamespace = certManager.certNamespace.metadata.name;
export const certToken = certManager.certToken.urn;
export const cert = certManager.cert.urn;

export const gitlabProjectName = gitlabProject.project.name;
export const gitlabClusterName = gitlabIntegration.cluster.name;
