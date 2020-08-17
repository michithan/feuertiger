const { execSync } = require('child_process');
const { writeFileSync, existsSync } = require('fs');
const execa = require('execa');
const config = require('@feuertiger/config');
const { root } = require('./paths');
const linkdist = require('./linkdist');

const asPostgres = command => `su - postgres -c "${command}"`;

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

const linkDistFolders = async () => {
    console.log('linking dist folders');
    await linkdist();
};

const setupDb = async () => {
    console.log('setup postgresql database');

    const openrcSoftlevelPath = '/run/openrc/softlevel';
    if (!existsSync(openrcSoftlevelPath)) {
        execSync(`touch ${openrcSoftlevelPath}`, {
            stdio: ['inherit', 'ignore', 'ignore']
        });
    }

    try {
        execSync('rc-service postgresql start', {
            stdio: ['inherit', 'ignore', 'ignore']
        });
        console.log('started postgresql service');
    } catch (error) {
        console.error(error);
        console.log('database service already started');
    }

    try {
        execSync(dbCreateUser, {
            stdio: ['inherit', 'ignore', 'ignore']
        });
        console.log('created database user');
    } catch (error) {
        console.error(error);
        console.log('database user already created');
    }

    try {
        execSync(dbCreateDb, {
            stdio: ['inherit', 'ignore', 'ignore']
        });
        console.log('created database');
    } catch (error) {
        console.error(error);
        console.log('database already created');
    }

    console.log('database setup finished ');
};

const syncEnv = async () => {
    console.log('sync project config with env');
    console.log(config.env);

    const exports = Object.entries(config.env).reduce(
        (acc, [key, value]) => `${acc}export ${key}=${value}\n`,
        ''
    );
    console.log(exports);
    writeFileSync(`/etc/profile.d/env.sh`, exports);
};

module.exports = async flags => {
    await installDependencies();
    await linkDistFolders();
    await setupDb();
    await syncEnv();
};
