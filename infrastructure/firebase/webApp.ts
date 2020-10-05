import * as gcp from '@pulumi/gcp';
import config from '@feuertiger/config';

import { project } from './project';
import { provider } from './provider';

const { projectName } = config;

export const webApp = new gcp.firebase.WebApp(
    projectName,
    {
        displayName: projectName,
        project: project.id
    },
    { dependsOn: [project], provider }
);
