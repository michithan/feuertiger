const execa = require('execa');
const { exec } = require('./utils');

const prettierrc = require.resolve('../../.prettierrc');
const prettierignore = require.resolve('../../.prettierignore');

const getPrettierBinary = async cwd => {
    const { stdout } = await execa('yarn', ['bin', 'prettier'], { cwd });
    return stdout;
};

const cwd = process.cwd();

const types = ['js', 'jsx', 'ts', 'tsx', 'json', 'graphql', 'yml', 'md'];

module.exports = async flags => {
    const bin = await getPrettierBinary(cwd);

    try {
        await exec(flags, ({ location }) => {
            const arguments = [
                `${location}/**/*.{${types.join(',')}}`,
                '--check',
                '--write',
                '--config',
                prettierrc,
                '--ignore-path',
                prettierignore,
                '--loglevel',
                'debug'
            ];
            return execa(bin, arguments, {
                detached: true,
                stdout: 'pipe'
            });
        });
    } catch (error) {
        console.log(error);
    }
};
