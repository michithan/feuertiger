const execa = require('execa');
const config = require('@feuertiger/config');

module.exports = async flags => {
    const {
        gitlab: { branchSlug, commit },
        npmRegistry
    } = config;
    try {
        await execa('lerna', [
            'publish',
            'prerelease',
            '--no-push',
            '--yes',
            '--exact',
            `--preid=${branchSlug}.${commit}`,
            `--registry=${npmRegistry}`
        ]);
    } catch (error) {
        console.log(error);
    }
};
