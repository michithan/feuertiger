/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { EventEmitter } from 'events';
import { Transform } from 'stream';
import * as execa from 'execa';

import { Flags } from '..';
import { extendedList, ExtendedPackageInfo } from './extendedList';
import { addErrorPackagePrefix, addPackagePrefix, tiger } from './logging';
import { Queue } from './Queue';

const transformExecaOutput = (
    execution: execa.ExecaChildProcess<string>,
    packageInfo: ExtendedPackageInfo
) => {
    const transform = (
        chunk: Buffer,
        encoding: BufferEncoding,
        callback: (error?: Error | null, data?: Buffer) => void
    ) => {
        const text = addPackagePrefix(chunk.toString(), packageInfo);
        // eslint-disable-next-line no-param-reassign
        chunk = Buffer.from(text);
        callback(null, chunk);
    };

    const transformError = (
        chunk: Buffer,
        encoding: BufferEncoding,
        callback: (error?: Error | null, data?: Buffer) => void
    ) => {
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
        ?.pipe(
            new Transform({
                transform
            })
        )
        .pipe(process.stdout);

    execution.stderr
        ?.pipe(
            new Transform({
                transform: transformError
            })
        )
        .pipe(process.stderr);
};

const kill = (
    stopping: boolean,
    execution: execa.ExecaChildProcess<string>,
    packageInfo: ExtendedPackageInfo
) => () => {
    if (!stopping) {
        execution.kill('SIGTERM', {
            forceKillAfterTimeout: 2000
        });
        tiger(`✋ stopping ${packageInfo.name} ✋`);
        // eslint-disable-next-line no-param-reassign
        stopping = true;
    }
};

const killOnExit = (
    execution: execa.ExecaChildProcess<string>,
    packageInfo: ExtendedPackageInfo
) => {
    const killer = kill(false, execution, packageInfo);
    process.once('SIGINT', killer);
    process.once('exit', killer);
    process.once('SIGUSR1', killer);
    process.once('SIGUSR2', killer);
    process.once('uncaughtException', killer);
};

const transformOutputIfExecaExecution = async (
    execution: execa.ExecaChildProcess<string> | unknown,
    packageInfo: ExtendedPackageInfo
): Promise<void> => {
    const execaExecution = execution as execa.ExecaChildProcess<string>;
    if (
        execaExecution?.stdout &&
        execaExecution?.stderr &&
        execaExecution?.kill
    ) {
        transformExecaOutput(execaExecution, packageInfo);
        killOnExit(execaExecution, packageInfo);
        await execaExecution;
    }
};

export const cancelExecutions = (
    executions: Array<execa.ExecaChildProcess<string>>
): void => executions.forEach(execution => execution.cancel());

export const exec = async <
    Result,
    FResult extends execa.ExecaChildProcess<string> | Promise<Result> | Result
>(
    flags: Flags,
    func: (
        packageInfo: ExtendedPackageInfo,
        packageInfos: Array<ExtendedPackageInfo>
    ) => FResult,
    parallel = false
): Promise<void> => {
    const packageInfos = await extendedList(flags);
    const queue = new Queue(packageInfos);

    EventEmitter.defaultMaxListeners = packageInfos.length * 3;

    const executions = packageInfos.map(async packageInfo => {
        if (!parallel) {
            await queue.enqueue(packageInfo);
        }
        try {
            const execution = func(packageInfo, packageInfos);

            await transformOutputIfExecaExecution(execution, packageInfo);

            if (execution instanceof Promise) {
                await execution;
            }

            if (!parallel) {
                // eslint-disable-next-line no-param-reassign
                packageInfo.completed = true;
                queue.check();
            }

            return execution;
        } catch (error) {
            console.log(
                'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRORRRRR'
            );
            if (typeof error === 'string') {
                console.log(addErrorPackagePrefix(error, packageInfo));
            } else if (typeof error?.message === 'string') {
                console.log(addErrorPackagePrefix(error?.message, packageInfo));
            }
            return Promise.reject;
        }
    });

    executions.forEach(execution => {
        execution.catch(error => {
            cancelExecutions(
                (execution as unknown) as Array<execa.ExecaChildProcess<string>>
            );
            console.error(error);
            process.exit(1);
        });
    });

    await Promise.all(executions);
};
