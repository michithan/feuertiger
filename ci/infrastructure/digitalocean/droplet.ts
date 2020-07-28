import * as digitalocean from '@pulumi/digitalocean';
import { projectName } from '@feuertiger/config';

import { provider } from './provider';

const name = `${projectName}-droplet`;

export const droplet = new digitalocean.Tag(
    name,
    {
        name
    },
    { provider, dependsOn: [provider] }
);
