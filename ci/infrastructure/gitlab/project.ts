import * as gitlab from '@pulumi/gitlab';
import config from '@feuertiger/config';

import { provider } from './provider';

export const project = gitlab.Project.get(
    config.projectName,
    '18726494',
    {},
    {
        provider
    }
);
