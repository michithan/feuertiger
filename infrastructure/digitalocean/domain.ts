import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';
import { ip } from '../kubernetes/apps';

export const domain = new digitalocean.Domain(
    'feuertiger.com',
    {
        name: 'feuertiger.com',
        ipAddress: ip
    },
    { provider }
);
