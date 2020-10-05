import * as gitlab from '@pulumi/gitlab';
import config from '@feuertiger/config';

const {
    projectName,
    gitlab: { token }
} = config;
const name = `${projectName}-gitlab-provider`;

export const provider = new gitlab.Provider(name, {
    token
});
