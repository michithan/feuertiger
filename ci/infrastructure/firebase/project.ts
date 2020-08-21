import * as gcp from '@pulumi/gcp';
import { gcp as gcpConfig, projectName } from '@feuertiger/config';

import { provider } from './provider';

export const project = gcp.firebase.Project.get(
    projectName,
    gcpConfig.project,
    {},
    {
        provider
    }
);
