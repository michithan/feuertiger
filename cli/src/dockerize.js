const fs = require('fs');
const path = require('path');
const execa = require('execa');
const { exec } = require('./utils');

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
                cwd: location
            }
        );
    }
    return Promise.resolve;
};

module.exports = async flags => {
    try {
        await exec(flags, dockerize, true);
    } catch (error) {
        console.log(error);
    }
};
