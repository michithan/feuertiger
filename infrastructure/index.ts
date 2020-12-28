import * as vpc from './digitalocean/vpc';
import * as cluster from './digitalocean/cluster';
import * as domain from './digitalocean/domain';

import { metricsServer } from './kubernetes/metrics-server';
import { address } from './kubernetes/nginx-ingress';
import { dns } from './kubernetes/external-dns';
import { certNamespace, certToken, cert, certClusterIssuer } from './kubernetes/cert-manager';

export const vpcName = vpc.vpc.name;
export const clusterName = cluster.cluster.name;
export const domainName = domain.domain.name;

export const { hostname, ip } = address;
export const certNamespaceName = certNamespace.metadata.name;

export const dnsUrn = dns.urn;
export const metricsServerUrn = metricsServer.urn;
export const certTokenUrn = certToken.urn;
export const certUrn = cert.urn;
export const certClusterIssuerUrn = certClusterIssuer.urn;
