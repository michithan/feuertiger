const execa = require('execa');
const { exec, checkIfNpmScriptExists } = require('./utils');

const build = ({ location }) => {
    const command = 'build';
    const hasBuildScript = checkIfNpmScriptExists({ location, command });
    if (hasBuildScript) {
        return execa('yarn', [command], {
            cwd: location,
            detached: true,
            stdout: 'pipe'
        });
    }
    return Promise.resolve;
};

module.exports = async flags => {
    try {
        await exec(flags, build);
    } catch (error) {
        console.log(error);
    }
};
