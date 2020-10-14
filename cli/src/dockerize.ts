import { Readable } from 'stream';
import { existsSync } from 'fs';
import { resolve } from 'path';
import execa from 'execa';
import {
    dockerRegistry,
    dockerRegistryRepository,
    gitlab
} from '@feuertiger/config/src';

import { exec } from './utils/exec';
import { PackageInfo } from './utils/list';
import { Flags } from '.';

const createTag = (name: string): string => {
    const version = 'latest';
    const imageName = name
        .toLowerCase()
        .replace(/[^a-z^0-9]/g, '-')
        .replace(/^[^a-z^0-9]/g, '');
    return `${dockerRegistryRepository}/${imageName}:${version}`;
};

const login = (): execa.ExecaChildProcess<string> => {
    const { token, user } = gitlab;
    const execution = execa(
        'docker',
        ['login', '-u', user, '--password-stdin', dockerRegistry],
        {
            stderr: 'inherit',
            stdout: 'inherit'
        }
    );
    if (execution.stdin) {
        Readable.from([token]).pipe(execution.stdin);
    }
    return execution;
};

const dockerize = ({
    location,
    name
}: PackageInfo): Promise<void> | execa.ExecaChildProcess<string> => {
    const dockerfile = resolve(location, 'Dockerfile');
    const hasDockerfile = existsSync(dockerfile);
    if (hasDockerfile) {
        const tag = createTag(name);
        return execa(
            'docker',
            ['build', '--pull', '--rm', '-f', 'Dockerfile', '-t', tag, '.'],
            {
                cwd: location,
                stderr: 'inherit',
                stdout: 'inherit'
            }
        );
    }
    return Promise.resolve();
};

const push = ({
    location,
    name
}: PackageInfo): Promise<void> | execa.ExecaChildProcess<string> => {
    const dockerfile = resolve(location, 'Dockerfile');
    const hasDockerfile = existsSync(dockerfile);
    if (hasDockerfile) {
        const tag = createTag(name);
        return execa('docker', ['push', tag], {
            cwd: location,
            stderr: 'inherit',
            stdout: 'inherit'
        });
    }
    return Promise.resolve();
};

export default async (flags: Flags): Promise<void> => {
    try {
        await login();
        await exec(flags, dockerize, true);
        await exec(flags, push, true);
    } catch (error) {
        console.log(error);
    }
};
