import * as digitalocean from '@pulumi/digitalocean';

import { vpc } from './vpc';
import { cluster } from './cluster';
import { domain } from './domain';

export const project = new digitalocean.Project('feuertiger', {
    name: 'feuertiger',
    resources: [vpc.urn, cluster.urn, domain.urn]
});
