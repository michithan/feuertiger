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

module.exports = async flags => {
    const formatter = await eslint.loadFormatter('stylish');
    await exec(flags, async packageInfo => {
        const { name, location } = packageInfo;

        console.log(addPackagePrefix(`linting ${name}`, packageInfo).trim());

        const results = await eslint.lintFiles(
            `${location}/**/*.{js,jsx,ts,tsx}`
        );

        await ESLint.outputFixes(results);

        const resultText = formatter.format(results);

        console.log(addPackagePrefix(resultText, packageInfo).trim());
    });
};
