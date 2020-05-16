const { execSync } = require('child_process');

console.log('Linking dist folders');
execSync('yarn linkdist', { stdio: 'inherit' });

console.log('Enforce code formatting');
execSync('yarn format', { stdio: 'inherit' });

const hasChanges = () =>
    JSON.parse(
        execSync('git diff-index --quiet HEAD || echo true').toString().trim()
    );

if (hasChanges()) {
    console.log('Commit code formatting changes');

    execSync('git commit -am "format & fix', { stdio: 'inherit' });

    execSync('git push', { stdio: 'inherit' });
} else {
    console.log('Check changes');

    const changes = JSON.parse(
        execSync('lerna list --since --json --no-private').toString()
    );

    console.log('changes: ', changes);

    console.log('Plan build steps');
}
