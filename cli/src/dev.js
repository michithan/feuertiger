const execa = require('execa');
const { exec, checkIfNpmScriptExists } = require('./utils');

const dev = ({ location }) => {
    const command = 'dev';
    const hasDevScript = checkIfNpmScriptExists({ location, command });
    if (hasDevScript) {
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
        await exec(flags, dev, true);
    } catch (error) {
        console.log(error);
    }
};
