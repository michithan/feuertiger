import * as digitalocean from '@pulumi/digitalocean';
import config from '@feuertiger/config';

import { provider } from './provider';

const name = `${config.projectName}-vpc`;

export const vpc = new digitalocean.Vpc(
    name,
    {
        name,
        region: digitalocean.Regions.FRA1
    },
    {
        provider,
        dependsOn: [provider]
    }
);
