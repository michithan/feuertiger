const fs = require('fs');
const { Readable } = require('stream');
const path = require('path');
const execa = require('execa');
const config = require('@feuertiger/config');
const { exec } = require('./utils');

const createTag = ({ name }) => {
    const { dockerRegistryRepository } = config;
    const version = 'latest';
    const imageName = name
        .toLowerCase()
        .replace(/[^a-z^0-9]/g, '-')
        .replace(/^[^a-z^0-9]/g, '');
    return `${dockerRegistryRepository}/${imageName}:${version}`;
};

const login = () => {
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
    Readable.from([token]).pipe(execution.stdin);
    return execution;
};

const dockerize = ({ location, name }) => {
    const dockerfile = path.resolve(location, 'Dockerfile');
    const hasDockerfile = fs.existsSync(dockerfile);
    if (hasDockerfile) {
        const tag = createTag({ name });
        return execa(
            'docker',
            ['build', '--pull', '--rm', '-f', 'Dockerfile', '-t', tag, '.'],
            {
                cwd: location
            }
        );
    }
    return Promise.resolve;
};

const push = ({ location, name }) => {
    const dockerfile = path.resolve(location, 'Dockerfile');
    const hasDockerfile = fs.existsSync(dockerfile);
    if (hasDockerfile) {
        const tag = createTag({ name });
        return execa('docker', ['push', tag], {
            cwd: location,
            stderr: 'inherit',
            stdout: 'inherit'
        });
    }
    return Promise.resolve;
};

module.exports = async flags => {
    try {
        await login();
        await exec(flags, dockerize, true);
        await exec(flags, push, true);
    } catch (error) {
        console.log(error);
    }
};
