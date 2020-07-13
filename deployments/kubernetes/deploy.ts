import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';

export interface DeploymentConfig {
    namespace: string;
    name: string;
    image: string;
    replicas: number;
    ports: [
        {
            intern: number;
            extern: number;
        }
    ];
    cpu: string;
    memory: string;
    env?: {
        [key: string]: string;
    };
    host?: string;
    path?: string;
}

export const deploy = ({
    namespace: namespacename,
    name,
    image,
    replicas,
    ports,
    cpu,
    memory,
    env,
    host,
    path
}: DeploymentConfig) => {
    const namespace = new k8s.core.v1.Namespace(
        namespacename,
        { metadata: { name: namespacename } },
        {
            provider
        }
    );

    const labels = { app: name };

    const metadata = {
        name,
        namespace: namespace.metadata.name,
        labels
    };

    const deployment = new k8s.apps.v1.Deployment(
        name,
        {
            metadata,
            spec: {
                replicas,
                selector: { matchLabels: labels },
                template: {
                    metadata: { labels },
                    spec: {
                        containers: [
                            {
                                name,
                                image,
                                resources: {
                                    requests: { cpu, memory }
                                },
                                env:
                                    env &&
                                    Object.entries(env).map(([key, value]) => ({
                                        name: key,
                                        value
                                    })),
                                ports: ports.map(({ intern }) => ({
                                    containerPort: intern
                                }))
                            }
                        ]
                    }
                }
            }
        },
        {
            provider
        }
    );

    const service = new k8s.core.v1.Service(
        name,
        {
            metadata,
            spec: {
                type: 'LoadBalancer',
                ports: ports.map(({ intern, extern }) => ({
                    targetPort: extern,
                    port: intern
                })),
                selector: labels
            }
        },
        {
            provider
        }
    );

    const ingress =
        host &&
        new k8s.networking.v1beta1.Ingress(
            name,
            {
                metadata,
                spec: {
                    rules: [
                        {
                            host,
                            http: {
                                paths: [
                                    {
                                        path: path || '/',
                                        backend: {
                                            serviceName: service.metadata.name,
                                            servicePort: 'http'
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

    return {
        name: service.metadata.name,
        namespace: namespace.metadata.name,
        images: deployment.spec.template.spec.containers.apply((containers) =>
            containers.map((container) => container.image)
        ),
        hostNames: (ingress as k8s.networking.v1beta1.Ingress)?.status.loadBalancer.ingress.apply(
            (address) => address.map(({ hostname }) => hostname)
        ),
        ips: (ingress as k8s.networking.v1beta1.Ingress)?.status.loadBalancer.ingress.apply(
            (address) => address.map(({ ip }) => ip)
        )
    };
};
