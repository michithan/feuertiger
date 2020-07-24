import * as digitalocean from '@pulumi/digitalocean';

export const project = new digitalocean.Project('feuertiger', {
    name: 'feuertiger'
});
