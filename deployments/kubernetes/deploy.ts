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

    const deployment = new k8s.apps.v1.Deployment(
        name,
        {
            metadata: {
                name,
                labels,
                namespace: namespace.metadata.name
            },
            spec: {
                selector: { matchLabels: labels },
                replicas,
                template: {
                    metadata: {
                        name,
                        labels,
                        namespace: namespace.metadata.name
                    },
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
                                ports: ports.map(({ intern, extern }) => ({
                                    containerPort: intern,
                                    hostPort: extern
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
            metadata: {
                name,
                namespace: deployment.spec.template.metadata.namespace,
                labels: deployment.spec.template.metadata.labels
            },
            spec: {
                type: 'NodePort',
                ports: ports.map(({ extern }) => ({
                    targetPort: extern,
                    port: extern
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
                metadata: {
                    name,
                    namespace: namespace.metadata.name,
                    annotations: {
                        'kubernetes.io/ingress.class': 'nginx',
                        'nginx.ingress.kubernetes.io/whitelist-source-range':
                            // '217.80.127.19/32'
                            '10.114.16.0/16'
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
                                            servicePort: ports[0]?.extern || 80
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
        hostNames: (ingress as k8s.networking.v1beta1.Ingress)?.spec.rules.apply(
            (rules) => rules?.map((rule) => rule.host)
        ),
        ips: (ingress as k8s.networking.v1beta1.Ingress)?.status.loadBalancer.ingress.apply(
            (address) => address?.map(({ ip }) => ip)
        )
    };
};
