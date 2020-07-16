import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';

export const vpc = new digitalocean.Vpc(
    'feuer-vpc',
    {
        region: digitalocean.Regions.FRA1,
        name: 'feuer-vpc'
    },
    {
        provider
    }
);
