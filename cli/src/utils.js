const execa = require('execa');

const getLernaBinary = async cwd => {
    const { stdout } = await execa('yarn', ['bin', 'lerna'], { cwd });
    return stdout;
};

const cwd = process.cwd();

exports.list = async ({ package, changed } = {}) => {
    const bin = await getLernaBinary(cwd);

    const args = ['list'];
    if (package) {
        args.push(`--scope`);
        args.push(package);
        args.push(`--include-dependents`);
    }
    if (changed) {
        args.push(`--since`);
    }
    args.push('--json');

    const { stdout } = await execa(bin, args);
    return stdout && JSON.parse(stdout);
};

exports.exec = async (flags, func) => {
    const packages = await exports.list(flags);
    await Promise.all(packages.map(func));
};
