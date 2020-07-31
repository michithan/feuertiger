const execa = require('execa');
const { list } = require('./utils');
const prettierrc = require.resolve('../../.prettierrc');

const getPrettierBinary = async cwd => {
    const { stdout } = await execa('yarn', ['bin', 'prettier'], { cwd });
    return stdout;
};

const cwd = process.cwd();

const types = ['js', 'jsx', 'ts', 'tsx', 'json', 'graphql', 'yml', 'md'];

module.exports = async flags => {
    const bin = await getPrettierBinary(cwd);
    const packages = await list(flags);
    for (const { location, name } of packages) {
        const location = packages[0].location;
        const arguments = [
            `${location}/**/*.{${types.join(',')}}`,
            '--check',
            // '--list-different',
            '--write',
            '--config',
            prettierrc,
            '--ignore-path',
            prettierrc.replace('.prettierrc', '.prettierignore'),
            '--loglevel',
            'debug'
        ];
        console.log(`formating ${name}`);
        await execa(bin, arguments, {
            stdout: 'inherit'
        });
    }
};
