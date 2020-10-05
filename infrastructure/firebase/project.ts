import * as gcp from '@pulumi/gcp';
import config from '@feuertiger/config';

import { provider } from './provider';

const { gcp: gcpConfig, projectName } = config;

export const project = gcp.firebase.Project.get(
    projectName,
    gcpConfig.project,
    {},
    {
        provider
    }
);
