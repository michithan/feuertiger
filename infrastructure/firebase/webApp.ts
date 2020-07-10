import { firebase } from '@pulumi/gcp';

import { project } from './project';

export const webApp = new firebase.WebApp('feuertiger', {
    displayName: 'feuertiger',
    project: project.id
});
