const execa = require('execa');
const { exec } = require('./utils');

const build = ({ location }) =>
    execa('yarn', ['build'], {
        cwd: location,
        detached: true,
        stdout: 'pipe'
    });

module.exports = async flags => {
    try {
        await exec(flags, build);
    } catch (error) {
        console.log(error);
    }
};
