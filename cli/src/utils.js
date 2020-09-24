/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const execa = require('execa');
const { EventEmitter } = require('events');
const chalk = require('chalk');
const { Transform } = require('stream');
const randomcolor = require('randomcolor');

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

const extendedList = async flags => {
    const packages = await list(flags);
    const longestName = packages
        .map(({ name }) => name.length + 1)
        .sort()
        .pop();
    const colors = randomcolor({
        seed: 1,
        count: packages.length
    });
    return Promise.all(
        packages.map(async ({ name, ...package }, index) => {
            let dependencies = await listDependencies(name);
            dependencies = dependencies.map(dependency =>
                packages.find(pgk => pgk.name === dependency.name)
            );
            const color = colors[index];
            const distance = new Array(longestName - name.length).join('═');
            const prefix = chalk.hex(color)(`${name} ${distance}═▷ `);
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
    `${prefix}${text.trimRight().replace(/\r?\n|\r/gi, `\r\n${prefix}`)}\r\n`;

const addErrorPackagePrefix = (text, { prefix }) => {
    const errorPrefix = prefix.replace('▷', '💥');
    return `${errorPrefix}${text
        .trimRight()
        .replace(/\r?\n|\r/gi, `\r\n${errorPrefix}`)}\r\n`;
};

const transformExecaOutput = (execution, packageInfo) => {
    const transform = (chunk, encoding, callback) => {
        const text = addPackagePrefix(chunk.toString(), packageInfo);
        // eslint-disable-next-line no-param-reassign
        chunk = Buffer.from(text);
        callback(null, chunk);
    };
    const transformError = (chunk, encoding, callback) => {
        const text = addErrorPackagePrefix(chunk.toString(), packageInfo);
        // eslint-disable-next-line no-param-reassign
        chunk = Buffer.from(text);
        callback(null, chunk);
    };
    execution.catch(error => {
        const text = error;
        if (typeof text === 'string') {
            console.log(addErrorPackagePrefix(text, packageInfo));
        }
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
                transform: transformError
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
        try {
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
        } catch (error) {
            if (typeof error === 'string') {
                console.log(addErrorPackagePrefix(error, packageInfo));
            }
            return Promise.reject;
        }
    });
    await Promise.allSettled(executions);
};

const checkIfNpmScriptExists = ({ location, command }) => {
    const package = require(`${location}/package.json`);
    return !!(package.scripts && package.scripts[command]);
};

exports.addPackagePrefix = addPackagePrefix;
exports.feuertiger = feuertiger;
exports.tiger = tiger;
exports.list = list;
exports.exec = exec;
exports.checkIfNpmScriptExists = checkIfNpmScriptExists;
