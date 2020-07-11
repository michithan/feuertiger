import * as digitalocean from '@pulumi/digitalocean';

export const provider = new digitalocean.Provider('feuer-cluster-provider');
