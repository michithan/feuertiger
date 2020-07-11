import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';

export const dev = new k8s.core.v1.Namespace(
    'feuertiger-dev',
    {},
    { provider }
);
