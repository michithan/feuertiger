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

execSync(`lerna version ${commit} --yes --exact --amend --preid=${branch}`);
