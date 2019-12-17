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
    `lerna publish prepatch --force-publish --yes --exact --no-push --no-git-reset --preid=${branch}.${commit} --registry=https://npm.pkg.github.com`
);
