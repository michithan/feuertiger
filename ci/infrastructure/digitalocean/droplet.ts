import * as digitalocean from '@pulumi/digitalocean';
import config from '@feuertiger/config';

import { provider } from './provider';

const name = `${config.projectName}-droplet`;

export const droplet = new digitalocean.Tag(
    name,
    {
        name
    },
    { provider, dependsOn: [provider] }
);
