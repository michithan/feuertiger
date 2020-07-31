const execa = require('execa');

const getLernaBinary = async cwd => {
    const { stdout } = await execa('yarn', ['bin', 'lerna'], { cwd });
    return stdout;
};

const cwd = process.cwd();

exports.list = async ({ package, changed } = {}) => {
    const bin = await getLernaBinary(cwd);

    const arguments = ['list'];
    if (package) {
        arguments.push(`--scope`);
        arguments.push(package);
        arguments.push(`--include-dependents`);
    }
    if (changed) {
        arguments.push(`--since`);
    }
    arguments.push('--json');

    const { stdout } = await execa(bin, arguments);
    return stdout && JSON.parse(stdout);
};
