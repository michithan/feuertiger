import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';

export const vpc = new digitalocean.Vpc(
    'feuer-vpc',
    {
        region: 'fra1'
    },
    {
        provider
    }
);
