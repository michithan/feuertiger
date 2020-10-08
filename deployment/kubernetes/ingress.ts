import { Output } from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';
import { ensureNamespace } from './namespace';

export interface IngressConfig {
    namespace: string;
    access?: { cidr: string }[];
    host: string;
    paths: Array<{
        path: string;
        serviceName: string | Output<string>;
        servicePort: number | Output<number>;
    }>;
}

export interface IngressResult {
    dns?: Output<string>;
    ip?: Output<string>;
}

export const ingress = ({
    namespace,
    host,
    paths,
    access
}: IngressConfig): IngressResult => {
    ensureNamespace(namespace);
    const name = host.replace(/\./g, '-');
    const k8ingress = new k8s.networking.v1beta1.Ingress(
        name,
        {
            metadata: {
                namespace,
                name,
                annotations: {
                    'kubernetes.io/ingress.class': 'nginx',
                    'kubernetes.io/tls-acme': 'true',
                    'cert-manager.k8s.io/cluster-issuer': 'letsencrypt-prod',
                    'nginx.ingress.kubernetes.io/whitelist-source-range':
                        access?.map(({ cidr }) => cidr)?.join(',') ??
                        '0.0.0.0/0'
                }
            },
            spec: {
                tls: [
                    {
                        hosts: [host],
                        secretName: `${name}-tls`
                    }
                ],
                rules: [
                    {
                        host,
                        http: {
                            paths: paths.map(
                                ({ path, serviceName, servicePort }) => ({
                                    path,
                                    backend: {
                                        serviceName,
                                        servicePort
                                    }
                                })
                            )
                        }
                    }
                ]
            }
        },
        {
            provider
        }
    );
    return {
        dns: k8ingress?.spec.rules.apply(rules => rules?.[0]?.host),
        ip: k8ingress?.status.loadBalancer.ingress.apply(
            address => address?.[0]?.ip
        )
    };
};
