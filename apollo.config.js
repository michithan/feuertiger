const { graphqlUri } = require('@feuertiger/config');

module.exports = {
    client: {
        service: {
            name: 'graphql',
            url: graphqlUri
        }
    }
};
