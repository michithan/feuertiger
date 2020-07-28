import * as gitlab from '@pulumi/gitlab';
import { projectName, gitlab as gitlabConfig } from '@feuertiger/config';

const name = `${projectName}-gitlab-provider`;

export const provider = new gitlab.Provider(name, {
    token: gitlabConfig.token
});
