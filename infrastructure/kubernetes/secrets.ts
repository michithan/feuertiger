import { Config } from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';

import { provider } from './provider';

const gitConfig = new Config('git');
const gitlabConfig = new Config('gitlab');

export const gitlab = new k8s.core.v1.Secret(
    'gitlab-registry',
    {
        type: 'kubernetes.io/dockerconfigjson',
        stringData: {
            '.dockerconfigjson': pulumi
                .all([
                    'registry.gitlab.com',
                    gitConfig.require('user'),
                    gitlabConfig.requireSecret('token'),
                    gitConfig.require('email')
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
