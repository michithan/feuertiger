import * as digitalocean from '@pulumi/digitalocean';

export const droplet = new digitalocean.Tag('feuer-droplet', {
    name: 'feuer-droplet'
});
