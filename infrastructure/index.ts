import * as firebaseProject from './firebase/project';
import * as auth from './firebase/auth';
import * as cluster from './digitalocean/cluster';
import * as deployments from './kubernetes/deployments';

export const clusterName = cluster.cluster.name;
