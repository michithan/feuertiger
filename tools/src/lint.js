const path = require('path');
const exec = require('@lerna/exec');
const { Linter } = require('eslint');

const linter = new Linter();
const root = path.resolve(__dirname, '..', '..');

const lintrc = require('../../.eslintrc');

module.exports = flags => {

    

    // exec({
    //     cmd: `eslint ./**/*.{ts,tsx} --fix --ignore-path ${root}/.eslintignore --config  ${root}/.eslintrc --resolve-plugins-relative-to  ${root}/ --no-error-on-unmatched-pattern`,
    //     noPrivate: true,
    //     stream: true
    // });
};
