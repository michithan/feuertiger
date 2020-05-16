const { execSync } = require('child_process');

execSync('yarn linkdist');

execSync('yarn format');

const hasChanges = () => JSON.parse(execSync('git diff-index --quiet HEAD || echo true').toString());

if (hasChanges()) {

    execSync('git commit -am "format & fix');

    execSync('git push');

} else {

    const changes = JSON.parse(
        execSync('lerna list --since --json --no-private').toString()
    );

    console.log("changes: ", changes);
}
