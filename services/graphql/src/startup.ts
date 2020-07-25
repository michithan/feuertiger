(async () => {
    // eslint-disable-next-line global-require
    const firebase = require('firebase');
    // eslint-disable-next-line global-require
    const { firebaseAdminConfig } = require('@feuertiger/config');
    try {
        await firebase.initializeApp(firebaseAdminConfig);
        // eslint-disable-next-line global-require
        require('./server')
            .gqlServer()
            .listen({ port: 4000 }, () =>
                // eslint-disable-next-line no-console
                console.log('🚀 Server ready at http://localhost:4000/graphql')
            );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error: ', error);
    }
})();
