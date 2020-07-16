import * as gitlab from '@pulumi/gitlab';

export const project = gitlab.Project.get('feuertiger', '18726494');
