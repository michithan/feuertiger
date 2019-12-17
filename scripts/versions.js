const { execSync } = require('child_process');

const commit = execSync('git rev-parse HEAD').toString().trim().substring(0, 7);
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

execSync(`lerna version prepatch --yes --exact --amend --preid=${branch} --cd-version=${commit}`);
