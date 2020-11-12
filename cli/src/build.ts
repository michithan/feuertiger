import execa from 'execa';
import { Flags } from '.';
import { exec } from './utils/exec';
import { checkIfNpmScriptExists } from './utils/checkIfNpmScriptExists';
import { PackageInfo } from './utils/list';

const build = ({
    location
}: PackageInfo): execa.ExecaChildProcess<string> | void => {
    const command = 'build';
    const hasBuildScript = checkIfNpmScriptExists({ location, command });
    if (hasBuildScript) {
        return execa('yarn', [command], {
            cwd: location,
            stdout: 'pipe'
        });
    }
};

export default async (flags: Flags): Promise<void> => {
    try {
        await exec(flags, build);
    } catch (error) {
        console.log(error);
    }
};
