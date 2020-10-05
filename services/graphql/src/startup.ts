(async () => {
    // eslint-disable-next-line global-require
    const firebase = require('firebase-admin');
    // eslint-disable-next-line global-require
    const { firebaseAdminConfig, graphqlUri } = require('@feuertiger/config');
    const [arg, number] = process.argv.slice(2);
    const defaultPort = 8080;
    const port = (arg === '--port' && number) || defaultPort;
    try {
        await firebase.initializeApp(firebaseAdminConfig);
        // eslint-disable-next-line global-require
        require('./server')
            .gqlServer()
            .listen({ port }, () =>
                // eslint-disable-next-line no-console
                console.log(
                    `🚀 Server ready at ${
                        port === defaultPort ? graphqlUri : `port ${port}`
                    }`
                )
            );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error: ', error);
    }
})();
