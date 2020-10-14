import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import execa from 'execa';
import { env } from '@feuertiger/config/src';
import { root } from './paths';

const asPostgres = (command: string): string => `su - postgres -c "${command}"`;

const dbCreateUser = asPostgres(
    'psql --command \\"CREATE USER feuertiger WITH SUPERUSER PASSWORD \'feuertiger\';\\"'
);

const dbCreateDb = asPostgres('createdb -O feuertiger feuertiger');

const installDependencies = async () => {
    console.log('installing dependencies');
    await execa('yarn', [], {
        cwd: root,
        stdout: 'inherit'
    });
};

const setupDb = async () => {
    console.log('setup postgresql database');

    const openrcSoftlevelPath = '/run/openrc/softlevel';
    if (!existsSync(openrcSoftlevelPath)) {
        execSync(`touch ${openrcSoftlevelPath}`, {
            stdio: ['inherit', 'ignore', 'inherit']
        });
    }

    try {
        execSync('rc-service postgresql start', {
            stdio: ['inherit', 'ignore', 'inherit']
        });
        console.log('started postgresql service');
    } catch (error) {
        console.log('database service already started');
    }

    try {
        execSync(dbCreateUser, {
            stdio: ['inherit', 'ignore', 'inherit']
        });
        console.log('created database user');
    } catch (error) {
        console.log('database user already created');
    }

    try {
        execSync(dbCreateDb, {
            stdio: ['inherit', 'ignore', 'inherit']
        });
        console.log('created database');
    } catch (error) {
        console.log('database already created');
    }

    console.log('database setup finished ');
};

const syncEnv = async () => {
    console.log('sync project config with env');

    const exports = Object.entries(env).reduce(
        (acc, [key, value]) => `${acc}export ${key}=${value}\n`,
        ''
    );

    console.log(exports);
    writeFileSync(`/etc/profile.d/env.sh`, exports);
};

export default async (): Promise<void> => {
    await installDependencies();
    await setupDb();
    await syncEnv();
};
