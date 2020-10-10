import * as gitlab from '@pulumi/gitlab';
import { projectName, gitlab as gitlabConfig } from '@feuertiger/config';

const name = `${projectName}-gitlab-provider`;

const { token } = gitlabConfig;

export const provider = new gitlab.Provider(name, {
    token
});
