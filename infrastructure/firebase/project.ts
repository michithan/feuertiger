import { firebase } from '@pulumi/gcp';

export const project = new firebase.Project('feuertiger');
