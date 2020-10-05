import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';
import { hostname } from './hostname';
import { address } from '../kubernetes/nginx-ingress';

export const domain = new digitalocean.Domain(
    hostname,
    {
        name: hostname,
        ipAddress: address.ip
    },
    {
        provider,
        dependsOn: [provider]
    }
);
