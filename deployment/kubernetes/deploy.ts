import * as k8s from '@pulumi/kubernetes';
import * as k8sx from '@pulumi/kubernetesx';

import { provider } from './provider';
import { ensureNamespace } from './namespace';

export interface DeploymentConfig {
    namespace: string;
    name: string;
    image: string;
    minReplicas: number;
    maxReplicas?: number;
    ports: {
        [key: string]: number;
    };
    cpu: number;
    memory: number;
    access?: { cidr: string }[];
    env?: {
        [key: string]: string;
    };
    host?: string;
    path?: string;
}

export const deploy = ({
    namespace,
    name,
    image,
    minReplicas,
    maxReplicas,
    ports,
    cpu,
    memory,
    env,
    host,
    path,
    access
}: DeploymentConfig) => {
    const { imagePullSecret } = ensureNamespace(namespace);
    const metadata = {
        name,
        namespace
    };

    const pod = new k8sx.PodBuilder({
        imagePullSecrets: [
            { name: imagePullSecret.metadata.apply(m => m.name) }
        ],
        containers: [
            {
                name,
                image,
                env,
                ports,
                resources: {
                    requests: {
                        cpu: `${Math.floor(cpu * 0.8)}m`,
                        memory: `${Math.floor(memory * 0.8)}Mi`
                    },
                    limits: { cpu: `${cpu}m`, memory: `${memory}Mi` }
                }
            }
        ]
    });

    const deployment = new k8sx.Deployment(
        name,
        {
            metadata,
            spec: pod.asDeploymentSpec({
                replicas: minReplicas
            })
        },
        { provider }
    );

    const service = new k8sx.Service(
        name,
        {
            metadata,
            spec: {
                ports: Object.values(ports).map(port => ({ port })),
                selector: {
                    app: name
                }
            }
        },
        { provider }
    );

    let autoscaling;
    if (maxReplicas) {
        autoscaling = new k8s.autoscaling.v2beta2.HorizontalPodAutoscaler(
            name,
            {
                metadata,
                spec: {
                    minReplicas,
                    maxReplicas,
                    scaleTargetRef: {
                        apiVersion: deployment.apiVersion,
                        kind: deployment.kind,
                        name: deployment.metadata.name
                    },
                    metrics: [
                        {
                            type: 'Resource',
                            resource: {
                                name: 'memory',
                                target: {
                                    type: 'Value',
                                    averageValue: `${Math.floor(
                                        memory * 0.8
                                    )}Mi`
                                }
                            }
                        }
                    ]
                }
            },
            { provider }
        );
    }

    let ingress;
    if (host) {
        ingress = new k8s.networking.v1beta1.Ingress(
            name,
            {
                metadata: {
                    ...metadata,
                    annotations: {
                        'kubernetes.io/ingress.class': 'nginx',
                        'kubernetes.io/tls-acme': 'true',
                        'cert-manager.k8s.io/cluster-issuer':
                            'letsencrypt-prod',
                        ...(access && {
                            'nginx.ingress.kubernetes.io/whitelist-source-range': access
                                .map(({ cidr }) => cidr)
                                .join(',')
                        })
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
                                paths: [
                                    {
                                        backend: {
                                            serviceName: service.metadata.name,
                                            servicePort: ports.http ?? 80
                                        },
                                        ...(path && {
                                            path
                                        })
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
        autoscaling: autoscaling?.status,
        image: deployment.spec.template.spec.containers.apply(
            containers => containers?.[0]?.image
        ),
        dns: ingress?.spec.rules.apply(rules => rules?.[0]?.host),
        ip: ingress?.status.loadBalancer.ingress.apply(
            address => address?.[0]?.ip
        )
    };
};
