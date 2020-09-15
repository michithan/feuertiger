const execa = require('execa');
const { EventEmitter } = require('events');
const chalk = require('chalk');
const { Transform } = require('stream');

const { log } = console;

const feuertiger = `${chalk.red('feuer')}${chalk.yellow('t')}${chalk.grey(
    'i'
)}${chalk.yellow('g')}${chalk.grey('e')}${chalk.yellow('r')}`;

const tiger = input => log(`${feuertiger} - ${input}`);

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
    const packages = stdout && JSON.parse(stdout);

    return packages;
};

const extendedList = async flags => {
    const packages = await list(flags);
    const longestName = packages
        .map(({ name }) => name.length + 1)
        .sort()
        .pop();
    return packages.map(({ name, ...package }, index) => {
        const color = colors(index);
        const distance = new Array(longestName - name.length).join(' ');
        const prefix = chalk.rgb(...color)(`${name} ${distance}=> `);
        return {
            ...package,
            name,
            prefix
        };
    });
};

const colors = index => {
    const r = [3, 4, 5, 6].includes(index % 8);
    const g = [1, 2, 5, 6].includes(index % 8);
    const b = [0, 2, 4, 6].includes(index % 8);
    const base = Math.ceil(255 / (Math.ceil(index / 8) || 1));
    return [r * base, g * base, b * base];
};

const addPackagePrefix = (text, { prefix }) =>
    `${prefix}${text.trim().replace(/\r\n|\n|\r/g, `\r\n${prefix}`)}\r\n`;

const transformExecaOutput = (execution, packageInfo) => {
    const transform = (chunk, encoding, callback) => {
        const text = addPackagePrefix(chunk.toString(), packageInfo);
        chunk = Buffer.from(text);
        callback(null, chunk);
    };
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
};

const exec = async (flags, func) => {
    const packageInfos = await extendedList(flags);
    EventEmitter.defaultMaxListeners = packageInfos.length * 3;
    const executions = packageInfos.map(packageInfo => {
        const execution = func(packageInfo);
        if (execution.stdout && execution.stderr) {
            transformExecaOutput(execution, packageInfo);
        }
        return execution;
    });
    await Promise.all(executions);
};

exports.addPackagePrefix = addPackagePrefix;
exports.feuertiger = feuertiger;
exports.tiger = tiger;
exports.list = list;
exports.exec = exec;
