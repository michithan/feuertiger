import { Output } from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as k8sx from '@pulumi/kubernetesx';

import { provider } from './provider';
import { ensureNamespace } from './namespace';

export interface ServiceConfig {
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
    env?: {
        [key: string]: string;
    };
}

export interface ServiceResult {
    name: Output<string>;
    namespace: Output<string>;
    autoscaling?: Output<unknown>;
    image: Output<string>;
    ports: {
        [key: string]: number;
    };
    dns?: Output<string>;
    ip?: Output<string>;
}

export const service = ({
    namespace,
    name,
    image,
    minReplicas,
    maxReplicas,
    ports,
    cpu,
    memory,
    env
}: ServiceConfig): ServiceResult => {
    const { imagePullSecret } = ensureNamespace(namespace);
    const metadata = {
        name,
        namespace
    };

    const k8pod = new k8sx.PodBuilder({
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

    const k8deployment = new k8sx.Deployment(
        name,
        {
            metadata,
            spec: k8pod.asDeploymentSpec({
                replicas: minReplicas
            })
        },
        { provider }
    );

    const k8service = new k8sx.Service(
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

    const k8autoscaling = maxReplicas
        ? new k8s.autoscaling.v2beta2.HorizontalPodAutoscaler(
              name,
              {
                  metadata,
                  spec: {
                      minReplicas,
                      maxReplicas,
                      scaleTargetRef: {
                          apiVersion: k8deployment.apiVersion,
                          kind: k8deployment.kind,
                          name: k8deployment.metadata.name
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
          )
        : null;

    return {
        name: k8service.metadata.name,
        namespace: k8service.metadata.namespace,
        ports,
        autoscaling: k8autoscaling?.status,
        image: k8deployment.spec.template.spec.containers.apply(
            containers => containers?.[0]?.image
        )
    };
};
