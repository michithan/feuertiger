import * as digitalocean from '@pulumi/digitalocean';
import { digitaloceanToken } from '@feuertiger/config';

export const provider = new digitalocean.Provider('feuer-cluster-provider', {
    token: digitaloceanToken
});
