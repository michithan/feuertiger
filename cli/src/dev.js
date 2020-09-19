const execa = require('execa');
const { exec } = require('./utils');

const dev = ({ location }) =>
    execa('yarn', ['dev'], {
        cwd: location,
        detached: true,
        stdout: 'pipe'
    });

module.exports = async flags => {
    try {
        await exec(flags, dev, true);
    } catch (error) {
        console.log(error);
    }
};
