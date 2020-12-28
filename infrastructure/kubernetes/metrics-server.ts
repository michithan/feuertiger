import * as path from 'path';
import * as k8s from '@pulumi/kubernetes';

import { provider } from './provider';

export const metricsServer = new k8s.yaml.ConfigFile(
    'metrics-server',
    {
        file: path.resolve(__dirname, 'configs', 'doks-metrics-server.yaml')
    },
    { provider }
);
