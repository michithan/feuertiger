const execa = require('execa');
const { exec, tiger } = require('./utils');

const cwd = process.cwd();

module.exports = async flags => {
    const bin = 'yarn';
    const arguments = ['build'];

    try {
        await exec(flags, ({ name, location }) => {
            const execution = execa(bin, arguments, {
                cwd: location,
                detached: true,
                stdout: 'pipe'
            });
            let stopping = false;
            const killer = () => {
                if (!stopping) {
                    execution.kill('SIGTERM', {
                        forceKillAfterTimeout: 2000
                    });
                    tiger(`✋ stoping building ${name} ✋`);
                    stopping = true;
                }
            };
            process.once('SIGINT', killer);
            process.once('exit', killer);
            process.once('SIGUSR1', killer);
            process.once('SIGUSR2', killer);
            process.once('uncaughtException', killer);
            return execution;
        });
    } catch (error) {
        console.log(error);
    }
};
