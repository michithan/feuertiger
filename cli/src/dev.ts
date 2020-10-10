import execa from 'execa';
import { Flags } from '.';
import { exec } from './utils/exec';
import { checkIfNpmScriptExists } from './utils/checkIfNpmScriptExists';
import { PackageInfo } from './utils/list';

const dev = ({
    location
}: PackageInfo): execa.ExecaChildProcess<string> | void => {
    const command = 'dev';
    const hasDevScript = checkIfNpmScriptExists({ location, command });
    if (hasDevScript) {
        return execa('yarn', [command], {
            cwd: location,
            detached: true,
            stdout: 'pipe'
        });
    }
};

export default async (flags: Flags): Promise<void> => {
    try {
        await exec(flags, dev, true);
    } catch (error) {
        console.log(error);
    }
};
