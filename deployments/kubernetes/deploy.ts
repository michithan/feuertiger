import * as k8s from '@pulumi/kubernetes';
import * as k8sx from '@pulumi/kubernetesx';

import { provider } from './provider';

export interface DeploymentConfig {
    namespace: string;
    name: string;
    image: string;
    replicas: number;
    ports: {
        [key: string]: number;
    };
    cpu: string;
    memory: string;
    access?: { cidr: string }[];
    env?: {
        [key: string]: string;
    };
    host?: string;
    path?: string;
}

const namespaces: { [key: string]: k8s.core.v1.Namespace } = {};
const ensureNamespace = (namespace: string) => {
    namespaces[namespace] =
        namespaces[namespace] ??
        new k8s.core.v1.Namespace(
            namespace,
            { metadata: { name: namespace } },
            { provider }
        );
};

export const deploy = ({
    namespace,
    name,
    image,
    replicas,
    ports,
    cpu,
    memory,
    env,
    host,
    path,
    access
}: DeploymentConfig) => {
    ensureNamespace(namespace);

    const pod = new k8sx.PodBuilder({
        containers: [
            {
                name,
                image,
                env,
                ports,
                resources: {
                    requests: { cpu, memory }
                }
            }
        ]
    });

    const deployment = new k8sx.Deployment(
        name,
        {
            metadata: {
                name,
                namespace
            },
            spec: pod.asDeploymentSpec({
                replicas
            })
        },
        { provider }
    );

    const service = deployment.createService({
        type: 'ClusterIP'
    });

    const ipWhitelist = access && {
        'nginx.ingress.kubernetes.io/whitelist-source-range': access
            .map(({ cidr }) => cidr)
            .join(',')
    };

    let ingress;
    if (host) {
        ingress = new k8s.networking.v1beta1.Ingress(
            name,
            {
                metadata: {
                    name,
                    namespace,
                    annotations: {
                        'kubernetes.io/ingress.class': 'nginx',
                        ...(ipWhitelist ?? {})
                    }
                },
                spec: {
                    rules: [
                        {
                            host,
                            http: {
                                paths: [
                                    {
                                        path: path ?? '/',
                                        backend: {
                                            serviceName: service.metadata.name,
                                            servicePort: ports.http ?? 80
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                provider
            }
        );
    }

    return {
        name,
        namespace,
        image: deployment.spec.template.spec.containers.apply(
            (containers) => containers?.[0]?.image
        ),
        dns: ingress?.spec.rules.apply((rules) => rules?.[0]?.host),
        ip: ingress?.status.loadBalancer.ingress.apply(
            (address) => address?.[0]?.ip
        )
    };
};
