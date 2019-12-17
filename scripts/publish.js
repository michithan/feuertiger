const { execSync } = require('child_process');

const commit = execSync('git rev-parse HEAD')
    .toString()
    .trim()
    .substring(0, 7)
    .split('/')
    .shift();
const branch = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();

execSync(
    `lerna publish prepatch --force-publish --yes --exact --amend --no-git-reset --preid=${branch}.${commit}`
);
