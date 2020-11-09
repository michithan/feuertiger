import { writeFileSync } from 'fs';
import execa from 'execa';
import { env } from '@feuertiger/config/src';
import { root } from './paths';

const installDependencies = async () => {
    console.log('installing dependencies');
    await execa('yarn', [], {
        cwd: root,
        stdout: 'inherit'
    });
};

const syncEnv = async () => {
    console.log('sync project config with env');

    const exports = Object.entries(env).reduce(
        (acc, [key, value]) => `${acc}export ${key}=${value}\n`,
        ''
    );

    writeFileSync(`/etc/profile.d/env.sh`, exports);
};

export default async (): Promise<void> => {
    await installDependencies();
    await syncEnv();
};
