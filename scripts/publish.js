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

const changes = JSON.parse(
    execSync('lerna list --since --json --no-private').toString()
);

if (changes.length > 0) {
    execSync(
        `lerna publish prerelease --yes --exact --amend --preid=${branch}.${commit} --registry=https://npm.pkg.github.com`
    );
    execSync('git commit --amend -m "publish\n\n\nskip-checks: true"');
    execSync('git push --force-with-lease');
}
