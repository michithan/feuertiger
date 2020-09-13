const execa = require('execa');
const faker = require('faker');
const { EventEmitter } = require('events');
const chalk = require('chalk');

const getLernaBinary = async cwd => {
    const { stdout } = await execa('yarn', ['bin', 'lerna'], { cwd });
    return stdout;
};

const cwd = process.cwd();

const list = async ({ package, changed } = {}) => {
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

const colors = index => {
    const r = [3, 4, 5, 6].includes(index % 8)
    const g = [1, 2, 5, 6].includes(index % 8)
    const b = [0, 2, 4, 6].includes(index % 8)
    const base = Math.ceil(255 / (Math.ceil(index / 8) || 1));
    return [
        r * base,
        g * base,
        b * base,
    ];
}

const exec = async (flags, func) => {
    const packages = await list(flags);
    faker.seed(packages.length);
    const longestName = packages
        .map(({ name }) => name.length + 1)
        .sort()
        .pop();
    const packageInfos = packages.map(({ name, ...package }, index) => {
        const color = colors(index);
        const distance = new Array(longestName - name.length).join(' ');
        const prefix = chalk.rgb(...color)(`${name} ${distance}=> `);
        return {
            ...package,
            name,
            prefix
        };
    });
    EventEmitter.defaultMaxListeners = (packages.length + 1) * 2;
    await Promise.all(packageInfos.map(func));
};

exports.list = list;
exports.exec = exec;
