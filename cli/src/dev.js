const execa = require('execa');
const { Transform } = require('stream');
const { exec, tiger } = require('./utils');

const cwd = process.cwd();

module.exports = async flags => {
    const bin = 'yarn';
    const arguments = ['dev'];

    try {
        await exec(flags, async ({ name, location, prefix }) => {
            const newLinePrefix = `\r\n${prefix}`;
            const transform = (chunk, encoding, callback) => {
                const text = chunk
                    .toString()
                    .trim()
                    .replace(/\r\n|\n|\r/g, newLinePrefix);
                chunk = Buffer.from(`${prefix}${text}\r\n`);
                callback(null, chunk);
            };
            const execution = execa(bin, arguments, {
                cwd: location,
                detached: true,
                stdout: 'pipe'
            });
            execution.stdout
                .pipe(
                    new Transform({
                        transform
                    })
                )
                .pipe(process.stdout);
            execution.stderr
                .pipe(
                    new Transform({
                        transform
                    })
                )
                .pipe(process.stderr);
            let stopping = false;
            const killer = () => {
                if (!stopping) {
                    execution.kill('SIGTERM', {
                        forceKillAfterTimeout: 2000
                    });
                    tiger(`✋ stopping ${name} ✋`);
                    stopping = true;
                }
            };
            process.once('SIGINT', killer);
            process.once('exit', killer);
            process.once('SIGUSR1', killer);
            process.once('SIGUSR2', killer);
            process.once('uncaughtException', killer);
            await execution;
            tiger(`🛑 stopped ${name} 🛑`);
        });
    } catch (error) {
        console.log(error);
    }
};
