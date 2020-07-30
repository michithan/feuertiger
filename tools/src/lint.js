const path = require('path');
const { list } = require('./utils');
const { Linter } = require('eslint');

const linter = new Linter();
const root = path.resolve(__dirname, '..', '..');

const lintrc = require('../../.eslintrc');

module.exports = flags => {
    const packages = await list(flags);

    // exec({
    //     cmd: `eslint ./**/*.{ts,tsx} --fix --ignore-path ${root}/.eslintignore --config  ${root}/.eslintrc --resolve-plugins-relative-to  ${root}/ --no-error-on-unmatched-pattern`,
    //     noPrivate: true,
    //     stream: true
    // });
};
