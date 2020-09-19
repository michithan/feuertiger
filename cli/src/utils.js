const execa = require('execa');
const { EventEmitter } = require('events');
const chalk = require('chalk');
const { Transform } = require('stream');

const { log } = console;
const { red, yellow, grey } = chalk;

const feuertiger = `${red('feuer')}${yellow('t')}${grey('i')}${yellow(
    'g'
)}${grey('e')}${yellow('r')}`;

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
        args.push(['--scope', package, '--include-dependents']);
    }
    if (changed) {
        args.push('--since');
    }
    args.push('--json');

    const { stdout } = await execa(bin, args);
    const packages = stdout && JSON.parse(stdout);

    return packages;
};

const listDependencies = async name => {
    const bin = await getLernaBinary(cwd);

    const args = ['list', '--scope', name, '--include-dependencies', '--json'];

    const { stdout } = await execa(bin, args);
    const dependencies = stdout && JSON.parse(stdout);

    return dependencies.filter(dependency => dependency.name !== name);
};

const colors = index => {
    const r = [3, 4, 5, 6].includes(index % 8);
    const g = [1, 2, 5, 6].includes(index % 8);
    const b = [0, 2, 4, 6].includes(index % 8);
    const a = Math.ceil(index / 8) || 1;
    const base = Math.ceil(255 / a);
    return [r * base, g * base, b * base];
};

const extendedList = async flags => {
    const packages = await list(flags);
    const longestName = packages
        .map(({ name }) => name.length + 1)
        .sort()
        .pop();
    return Promise.all(
        packages.map(async ({ name, ...package }, index) => {
            let dependencies = await listDependencies(name);
            dependencies = dependencies.map(dependency =>
                packages.find(pgk => pgk.name === dependency.name)
            );
            const color = colors(index);
            const distance = new Array(longestName - name.length).join(' ');
            const prefix = chalk.rgb(...color)(`${name} ${distance}=> `);
            return {
                ...package,
                dependencies,
                name,
                prefix
            };
        })
    );
};

const addPackagePrefix = (text, { prefix }) =>
    `${prefix}${text.trim().replace(/\r?\n|\r/gi, `\r\n${prefix}`)}\r\n`;

const transformExecaOutput = (execution, packageInfo) => {
    const transform = (chunk, encoding, callback) => {
        const text = addPackagePrefix(chunk.toString(), packageInfo);
        // eslint-disable-next-line no-param-reassign
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

class Queue {
    queue = [];

    packageInfos = [];

    constructor(packageInfos) {
        this.packageInfos = packageInfos;
    }

    enqueue = packageInfo =>
        new Promise(resolve => {
            this.queue.push({ packageInfo, awaiter: resolve });
            this.check();
        });

    findPackageInfo = name =>
        this.packageInfos.find(packageInfo => packageInfo.name === name)
            .completed;

    isReady = dependencies =>
        dependencies.every(({ name }) => this.findPackageInfo(name));

    check() {
        this.queue = this.queue.filter(
            ({ packageInfo: { dependencies }, awaiter }) => {
                const ready = this.isReady(dependencies);
                if (ready) {
                    awaiter();
                }
                return !ready;
            }
        );
    }
}

const kill = (stopping, execution, packageInfo) => () => {
    if (!stopping) {
        execution.kill('SIGTERM', {
            forceKillAfterTimeout: 2000
        });
        tiger(`✋ stopping ${packageInfo.name} ✋`);
        // eslint-disable-next-line no-param-reassign
        stopping = true;
    }
};

const killOnExit = (execution, packageInfo) => {
    const killer = kill(false, execution, packageInfo);
    process.once('SIGINT', killer);
    process.once('exit', killer);
    process.once('SIGUSR1', killer);
    process.once('SIGUSR2', killer);
    process.once('uncaughtException', killer);
};

const exec = async (flags, func, parallel) => {
    const packageInfos = await extendedList(flags);
    const queue = new Queue(packageInfos);

    EventEmitter.defaultMaxListeners = packageInfos.length * 3;

    const executions = packageInfos.map(async packageInfo => {
        if (parallel) {
            await queue.enqueue(packageInfo);
        }

        const execution = func(packageInfo, packageInfos);

        if (execution.stdout && execution.stderr && execution.kill) {
            transformExecaOutput(execution, packageInfo);
            killOnExit(execution, packageInfo);
        }

        if (execution instanceof Promise) {
            await execution;
        }

        if (parallel) {
            // eslint-disable-next-line no-param-reassign
            packageInfo.completed = true;
            queue.check(queue);
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
