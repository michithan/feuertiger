import * as digitalocean from '@pulumi/digitalocean';
import config from '@feuertiger/config';

export const provider = new digitalocean.Provider('feuer-cluster-provider', {
    token: config.digitaloceanToken
});
