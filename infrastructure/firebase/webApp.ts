import * as gcp from '@pulumi/gcp';

import { project } from './project';

export const webApp = new gcp.firebase.WebApp('feuertiger', {
    displayName: 'feuertiger',
    project: project.id
});
