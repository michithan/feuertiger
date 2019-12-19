const { execSync } = require('child_process');

const commit = execSync('git rev-parse HEAD')
    .toString()
    .trim()
    .substring(0, 7);
const branch = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim()
    .split('/')
    .shift();

execSync(
    `lerna publish prerelease --yes --exact --no-push --preid=${branch}.${commit} --registry=https://npm.pkg.github.com`
);
