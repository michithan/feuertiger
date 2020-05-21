const merge = require('lodash.merge');
const { getFirebaseAppSecrets } = require('@feuertiger/tools');
const withTM = require('next-transpile-modules');

const defaultWebpackConfig = require('../../webpack.config');

module.exports = withTM({
    transpileModules: [
        '@feuertiger/schema-graphql',
        '@feuertiger/ocr',
        '@feuertiger/web-components'
    ],
    webpack: (config) => merge(defaultWebpackConfig, config),
    publicRuntimeConfig: {
        tokens: getFirebaseAppSecrets()
    },
    distDir: './dist'
});
