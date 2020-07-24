import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';
import { hostname } from './hostname';
import { address } from '../kubernetes/cert-manager';

export const domain = new digitalocean.Domain(
    hostname,
    {
        name: hostname,
        ipAddress: address.ip
    },
    { provider }
);
