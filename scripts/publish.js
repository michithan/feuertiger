const { execSync } = require('child_process');

const commit = execSync('git rev-parse HEAD')
    .toString()
    .trim()
    .substring(0, 7);
const fullBranchName = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();
const branch = fullBranchName
    .split('/')
    .shift();

execSync(
    `lerna publish prerelease --yes --exact --preid=${branch}.${commit} --registry=https://npm.pkg.github.com`
);
