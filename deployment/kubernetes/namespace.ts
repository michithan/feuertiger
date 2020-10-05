import { Config } from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';

const gitlabConfig = new Config('gitlab');

interface Namespace {
    namespace: k8s.core.v1.Namespace;
    imagePullSecret: k8s.core.v1.Secret;
}

const namespaces: {
    [key: string]: Namespace;
} = {};

export const ensureNamespace = (namespace: string): Namespace => {
    namespaces[namespace] = namespaces[namespace] ?? {
        namespace: new k8s.core.v1.Namespace(
            namespace,
            { metadata: { name: namespace } },
            { provider }
        ),
        imagePullSecret: new k8s.core.v1.Secret(
            'gitlab-registry',
            {
                metadata: {
                    name: 'gitlab-registry',
                    namespace
                },
                type: 'kubernetes.io/dockerconfigjson',
                stringData: {
                    '.dockerconfigjson': JSON.stringify({
                        auths: {
                            'registry.gitlab.com': {
                                auth: Buffer.from(
                                    `${gitlabConfig.require(
                                        'user'
                                    )}:${gitlabConfig.require('token')}`
                                ).toString('base64'),
                                username: gitlabConfig.require('user'),
                                email: gitlabConfig.require('user'),
                                password: gitlabConfig.require('token')
                            }
                        }
                    })
                }
            },
            {
                provider
            }
        )
    };
    return namespaces[namespace];
};
