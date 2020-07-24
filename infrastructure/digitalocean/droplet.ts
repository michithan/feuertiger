import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';

export const droplet = new digitalocean.Tag(
    'feuer-droplet',
    {
        name: 'feuer-droplet'
    },
    { provider, dependsOn: [provider] }
);
