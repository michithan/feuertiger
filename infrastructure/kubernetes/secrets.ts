import { Config } from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

import { provider } from './provider';

const gitConfig = new Config('git');
const gitlabConfig = new Config('gitlab');

export const gitlab = {
    registry: 'registry.gitlab.com',
    user: gitConfig.require('user'),
    email: gitConfig.require('email'),
    password: gitlabConfig.requireSecret('token')
};

export const gitlabRegistrySecret = new k8s.core.v1.Secret(
    'gitlab-registry',
    {
        type: 'kubernetes.io/dockerconfigjson',
        stringData: {
            '.dockerconfigjson': pulumi
                .all([
                    gitlab.registry,
                    gitlab.user,
                    gitlab.password,
                    gitlab.email
                ])
                .apply(([server, username, password, email]) => {
                    return JSON.stringify({
                        auths: {
                            [server]: {
                                auth: Buffer.from(
                                    `${username}:${password}`
                                ).toString('base64'),
                                username,
                                email,
                                password
                            }
                        }
                    });
                })
        }
    },
    {
        provider
    }
);
