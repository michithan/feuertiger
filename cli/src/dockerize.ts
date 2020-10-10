import { Readable } from 'stream';
import * as fs from 'fs';
import * as path from 'path';
import execa from 'execa';
import config from '@feuertiger/config';

import { exec } from './utils/exec';
import { PackageInfo } from './utils/list';
import { Flags } from '.';

const createTag = (name: string): string => {
    const { dockerRegistryRepository } = config;
    const version = 'latest';
    const imageName = name
        .toLowerCase()
        .replace(/[^a-z^0-9]/g, '-')
        .replace(/^[^a-z^0-9]/g, '');
    return `${dockerRegistryRepository}/${imageName}:${version}`;
};

const login = (): execa.ExecaChildProcess<string> => {
    const {
        gitlab: { token, user },
        dockerRegistry
    } = config;
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
    const dockerfile = path.resolve(location, 'Dockerfile');
    const hasDockerfile = fs.existsSync(dockerfile);
    if (hasDockerfile) {
        const tag = createTag(name);
        return execa(
            'docker',
            ['build', '--pull', '--rm', '-f', 'Dockerfile', '-t', tag, '.'],
            {
                cwd: location
            }
        );
    }
    return Promise.resolve();
};

const push = ({
    location,
    name
}: PackageInfo): Promise<void> | execa.ExecaChildProcess<string> => {
    const dockerfile = path.resolve(location, 'Dockerfile');
    const hasDockerfile = fs.existsSync(dockerfile);
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
