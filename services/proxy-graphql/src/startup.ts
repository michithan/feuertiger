(() => {
    // eslint-disable-next-line global-require
    const secrets = require('@feuertiger/tools').getFirebaseAdminSecrets();
    // eslint-disable-next-line global-require
    const admin = require('firebase-admin');
    admin.initializeApp({
        credential: admin.credential.cert(secrets)
    });
    // eslint-disable-next-line global-require
    require('./server')
        .gqlServer()
        .listen({ port: 4000 }, () =>
            // eslint-disable-next-line no-console
            console.log('🚀 Server ready at http://localhost:4000/graphql')
        );
})();
