import * as gcp from '@pulumi/gcp';
import config from '@feuertiger/config';

const { digitaloceanToken, projectName } = config;
const name = `${projectName}-firebase-provider`;

export const provider = new gcp.Provider(name, {
    accessToken: digitaloceanToken
});
