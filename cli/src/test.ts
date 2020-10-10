import execa from 'execa';

import { Flags } from '.';
import { checkIfNpmScriptExists } from './utils/checkIfNpmScriptExists';
import { exec } from './utils/exec';
import { ExtendedPackageInfo } from './utils/extendedList';

const test = ({
    location
}: ExtendedPackageInfo): execa.ExecaChildPromise<string> | void => {
    const command = 'test';
    const hasTestScript = checkIfNpmScriptExists({ location, command });
    if (hasTestScript) {
        return execa('yarn', [command], {
            cwd: location,
            detached: true,
            stdout: 'pipe'
        });
    }
};

export default async (flags: Flags): Promise<void> => {
    try {
        await exec(flags, test, true);
    } catch (error) {
        console.log(error);
    }
};
