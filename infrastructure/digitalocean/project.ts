import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';
import { vpc } from './vpc';
import { domain } from './domain';

export const project = new digitalocean.Project(
    'feuertiger',
    {
        name: 'feuertiger',
        resources: [vpc.vpcUrn, domain.domainUrn]
    },
    { provider, dependsOn: [vpc, domain] }
);
