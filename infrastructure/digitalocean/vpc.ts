import * as digitalocean from '@pulumi/digitalocean';
import { projectName } from '@feuertiger/config';

import { provider } from './provider';

const name = `${projectName}-vpc`;

export const vpc = new digitalocean.Vpc(
    name,
    {
        name,
        region: digitalocean.Regions.FRA1
    },
    {
        provider
    }
);
