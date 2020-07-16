import * as digitalocean from '@pulumi/digitalocean';

import { provider } from './provider';
import { vpc } from './vpc';
import { droplet } from './droplet';

export const loadBalancer = new digitalocean.LoadBalancer(
    'feuer-lb',
    {
        dropletTag: droplet.id,
        region: digitalocean.Regions.FRA1,
        vpcUuid: vpc.id,
        enableProxyProtocol: true,
        forwardingRules: [
            {
                entryPort: 80,
                entryProtocol: digitalocean.Protocols.TCP,
                targetPort: 30039,
                targetProtocol: digitalocean.Protocols.TCP
            },
            {
                entryPort: 443,
                entryProtocol: digitalocean.Protocols.TCP,
                targetPort: 30258,
                targetProtocol: digitalocean.Protocols.TCP
            }
        ],
        healthcheck: {
            port: 30039,
            protocol: digitalocean.Protocols.TCP
        }
    },
    {
        provider
    }
);
