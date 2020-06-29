import * as pulumi from '@pulumi/pulumi';
import { firebase } from '@pulumi/gcp';
import * as k8s from '@pulumi/kubernetes';

const config = new pulumi.Config();

/*
 * TODO ensure that firebase project and app ist created
 * - for firebase auth config for backend
 * - for firebase auth config for frontned
 */
export const firebaseProject = new firebase.Project('feuertiger');

export const firebaseWebApp = new firebase.WebApp('feuertiger', {
    displayName: 'feuertiger',
    project: firebaseProject.id
});

/*
 * TODO ensure that firebase project and app ist created
 * - deploy to kubernetes
 */
const appLabels = { app: 'nginx' };

const deployment = new k8s.apps.v1.Deployment('nginx', {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{ name: 'nginx', image: 'nginx' }] }
        }
    }
});

export const { name } = deployment.metadata;

// export const firebaseConfig = firebase.getWebAppConfig({
//     webAppId: firebaseWebApp.id
// });
