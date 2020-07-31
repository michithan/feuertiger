const { list } = require('./utils');
const { root } = require('./paths');
const { ESLint } = require('eslint');
const eslintrc = require('../../.eslintrc');

const eslint = new ESLint({
    fix: true,
    useEslintrc: false,
    baseConfig: eslintrc,
    resolvePluginsRelativeTo: `${root}/`,
    errorOnUnmatchedPattern: false
});

module.exports = async flags => {
    const packages = await list(flags);
    for (const { location } of packages) {
        const location = packages[0].location;

        console.log('lintFiles: ', location);

        const results = await eslint.lintFiles(
            `${location}/**/*.{js,jsx,ts,tsx}`
        );

        console.log('results: ', results);

        await ESLint.outputFixes(results);

        const resultText = formatter.format(results);

        console.log(resultText);
    }
};
