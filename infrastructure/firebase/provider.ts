import * as gcp from '@pulumi/gcp';
import { digitaloceanToken, projectName } from '@feuertiger/config';

const name = `${projectName}-firebase-provider`;

export const provider = new gcp.Provider(name, {
    accessToken: digitaloceanToken
});
