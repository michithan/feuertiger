import * as k8s from '@pulumi/kubernetes';

import { cluster } from '../digitalocean/cluster';

const appLabels = { app: 'nginx' };

export const deployment = new k8s.apps.v1.Deployment('nginx', {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{ name: 'nginx', image: 'nginx' }] }
        }
    }
});
