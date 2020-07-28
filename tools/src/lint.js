const path = require('path');
const exec = require('@lerna/exec');

const root = path.resolve(__dirname, '..', '..');

exec({
    cmd: `eslint ./**/*.{ts,tsx} --fix --ignore-path ${root}/.eslintignore --config  ${root}/.eslintrc --resolve-plugins-relative-to  ${root}/ --no-error-on-unmatched-pattern`,
    noPrivate: true,
    stream: true
});
