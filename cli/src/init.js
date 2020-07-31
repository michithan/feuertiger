const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const execa = require('execa');
const config = require('@feuertiger/config');
const { root } = require('./paths');
const linkdist = require('./linkdist');

const asPostgres = command => `su - postgres -c "${command}"`;

const dbCreateUser = asPostgres(
    'psql --command \\"CREATE USER feuertiger WITH SUPERUSER PASSWORD \'feuertiger\';\\"'
);

const dbCreateDb = asPostgres('createdb -O feuertiger feuertiger');

module.exports = async flags => {
    // console.log('installing dependencies');
    // await execa('yarn', [], {
    //     cwd: root,
    //     stdout: 'inherit'
    // });

    // console.log('linking dist folders');
    // await linkdist();

    // console.log('setup postgresql database');
    // try {
    //     execSync('touch /run/openrc/softlevel', {
    //         stdio: ['inherit', 'ignore', 'ignore']
    //     });
    //     execSync('rc-service postgresql start', {
    //         stdio: ['inherit', 'ignore', 'ignore']
    //     });
    //     execSync(dbCreateUser, {
    //         stdio: ['inherit', 'ignore', 'ignore']
    //     });
    //     execSync(dbCreateDb, {
    //         stdio: ['inherit', 'ignore', 'ignore']
    //     });
    //     console.log('database setup finished ');
    // } catch (error) {
    //     console.log('database already setup');
    // }

    console.log('sync project config with env');
    console.log(config.env);

    const exports = Object.entries(config.env).reduce(
        (acc, [key, value]) => `${acc}export ${key}=${value}\n`,
        ''
    );
    console.log(exports);
    writeFileSync(`/etc/profile.d/env.sh`, exports);
};
