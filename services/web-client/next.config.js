const merge = require('lodash.merge');
const { firebaseAppConfig, graphqlUri } = require('@feuertiger/config');
const withTM = require('next-transpile-modules');
const withSourceMaps = require('@zeit/next-source-maps');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});
const {
    PHASE_PRODUCTION_BUILD,
    PHASE_PRODUCTION_SERVER
} = require('next/constants');

const compose = (...plugins) => config =>
    plugins.reduce((composedConfig, plugin) => plugin(composedConfig), config);

module.exports = (phase, { defaultConfig }) =>
    compose(
        withSourceMaps,
        withTM([
            '@feuertiger/ocr',
            '@feuertiger/schema-graphql',
            '@feuertiger/web-components'
        ]),
        withBundleAnalyzer
    )({
        devtool: 'hidden-source-map',
        transpileModules: [
            '@feuertiger/ocr',
            '@feuertiger/schema-graphql',
            '@feuertiger/web-components'
        ],
        webpack: config => {
            config.module.rules.push({
                test: /\.test.tsx$/,
                loader: 'ignore-loader'
            });
            return merge(
                {
                    node: {
                        fs: 'empty',
                        child_process: 'empty',
                        net: 'empty',
                        tls: 'empty'
                    }
                },
                config
            );
        },
        publicRuntimeConfig: {
            tokens: firebaseAppConfig,
            graphqlUri:
                phase === PHASE_PRODUCTION_BUILD ||
                phase === PHASE_PRODUCTION_SERVER
                    ? '/graphql'
                    : graphqlUri
        },
        distDir: './dist'
    });
