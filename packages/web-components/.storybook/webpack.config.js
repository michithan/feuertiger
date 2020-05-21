const merge = require('lodash.merge');
const defaultWebpackConfig = require('../../../webpack.config');

const mergeconfig = (a, b) =>
    merge(a, b, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
            console.log(objValue.concat(srcValue));
            return objValue.concat(srcValue);
        }
    });

module.exports = ({ config }) => {
    const withDefault = mergeconfig(config, defaultWebpackConfig);
    const withCustom = mergeconfig(withDefault, {
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            alias: {
                '@feuertiger/ocr': require.resolve('@feuertiger/ocr')
            }
        }
    });
    withCustom.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [require.resolve('babel-preset-react-app')]
        }
    });
    return withCustom;
};
