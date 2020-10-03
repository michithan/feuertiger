const fs = require('fs');
const { Readable } = require('stream');
const path = require('path');
const execa = require('execa');
const config = require('@feuertiger/config');
const { exec } = require('./utils');

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
        const version = 'latest';
        const imageName = name
            .toLowerCase()
            .replace(/[^a-z^0-9]/g, '-')
            .replace(/^[^a-z^0-9]/g, '');
        const tag = `${imageName}:${version}`;

        return execa(
            'docker',
            ['build', '--pull', '--rm', '-f', 'Dockerfile', '-t', tag, '.'],
            {
                cwd: location,
                stderr: 'pipe',
                stdout: 'pipe'
            }
        );
    }
    return Promise.resolve;
};

const push = ({ location, name }) => {
    const dockerfile = path.resolve(location, 'Dockerfile');
    const hasDockerfile = fs.existsSync(dockerfile);
    if (hasDockerfile) {
        const version = 'latest';
        const imageName = name
            .toLowerCase()
            .replace(/[^a-z^0-9]/g, '-')
            .replace(/^[^a-z^0-9]/g, '');
        const tag = `${imageName}:${version}`;
        return execa('docker', ['push', tag], {
            cwd: location,
            stderr: 'pipe',
            stdout: 'pipe'
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
