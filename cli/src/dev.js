const execa = require('execa');
const { Transform } = require('stream');
const { exec } = require('./utils');

const cwd = process.cwd();

module.exports = async flags => {
    const bin = 'yarn';
    try {
        await exec(flags, async ({ location, prefix }) => {
            const arguments = ['dev'];
            const execution = execa(bin, arguments, {
                cwd: location,
                detached: true,
                stdout: 'pipe'
            });
            const newLinePrefix = `\r\n${prefix}`;
            const transform = new Transform({
                transform(chunk, encoding, callback) {
                    const text = chunk.toString().trim();
                    chunk = Buffer.from(
                        `${prefix}${text.replace('\r\n', newLinePrefix)}\r\n`
                    );
                    callback(null, chunk);
                }
            });
            execution.stdout.pipe(transform).pipe(process.stdout);
            await execution;
        });
    } catch (error) {
        console.log(error);
    }
};
