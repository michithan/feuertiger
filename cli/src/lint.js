const { ESLint } = require('eslint');
const { exec, addPackagePrefix } = require('./utils');
const { root } = require('./paths');
const eslintrc = require('../../.eslintrc');

const eslint = new ESLint({
    fix: true,
    useEslintrc: false,
    baseConfig: eslintrc,
    resolvePluginsRelativeTo: `${root}/`,
    errorOnUnmatchedPattern: false
});

const lint = formatter => async packageInfo => {
    const { name, location } = packageInfo;
    const log = text => console.log(addPackagePrefix(text, packageInfo).trim());

    log(`linting ${name}`);

    const results = await eslint.lintFiles(`${location}/**/*.{js,jsx,ts,tsx}`);

    await ESLint.outputFixes(results);

    const resultText = formatter.format(results);

    if (resultText) {
        log(resultText);
    }
};

module.exports = async flags => {
    const formatter = await eslint.loadFormatter('stylish');
    await exec(flags, lint(formatter), true);
};
