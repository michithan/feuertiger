const merge = require('lodash.merge');
const { getFirebaseAppSecrets } = require('@feuertiger/tools');
const withTM = require('next-transpile-modules');

module.exports = withTM({
    transpileModules: ['@feuertiger/ocr'],
    webpack: config =>
        merge(
            {
                // Fixes npm packages that depend on `fs` module
                // eslint-disable-next-line no-param-reassign
                node: {
                    fs: 'empty'
                }
            },
            config
        ),
    publicRuntimeConfig: {
        tokens: getFirebaseAppSecrets()
    },
    distDir: './dist'
});
