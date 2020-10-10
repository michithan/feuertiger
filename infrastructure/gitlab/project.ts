import * as gitlab from '@pulumi/gitlab';
import { projectName } from '@feuertiger/config';

import { provider } from './provider';

export const project = gitlab.Project.get(
    projectName,
    '18726494',
    {},
    {
        provider
    }
);
