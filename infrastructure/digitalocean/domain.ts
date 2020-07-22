import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';

export const hostname = 'feuertiger.com';

export const domain = new digitalocean.Domain(
    hostname,
    {
        name: hostname
    },
    { provider, deleteBeforeReplace: true }
);
