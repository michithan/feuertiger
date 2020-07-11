import { Config } from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';

const gcpConfig = new Config('gcp');

export const project = gcp.firebase.Project.get(
    'feuertiger',
    gcpConfig.require('project')
);
