const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on, config) => {
    on('file:preprocessor', cypressTypeScriptPreprocessor);
};
