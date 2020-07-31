const { execSync } = require('child_process');
const execa = require('execa');
const { root } = require('./paths');
const linkdist = require('./linkdist');

module.exports = async flags => {
    // console.log('installing dependencies');
    // await execa('yarn', [], {
    //     cwd: root,
    //     stdout: 'inherit'
    // });
    // console.log('linking dist folders');
    // await linkdist();
    console.log('create db');
    execSync('su - postgres -c "/etc/init.d/postgresql stop"');
    execSync('su - postgres -c "/etc/init.d/postgresql start"');
    execSync(
        `su - postgres -c "psql --command 'CREATE USER feuertiger WITH SUPERUSER PASSWORD feuertiger;'"`
    );
    execSync(`su - postgres -c "createdb -O feuertiger feuertiger"`);
};
