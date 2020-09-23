const execa = require('execa');
const { exec, checkIfNpmScriptExists } = require('./utils');

const test = ({ location }) => {
    const command = 'test';
    const hasTestScript = checkIfNpmScriptExists({ location, command });
    if (hasTestScript) {
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
        await exec(flags, test, true);
    } catch (error) {
        console.log(error);
    }
};
