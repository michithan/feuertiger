import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import context from './context';

export const gqlServer = () => {
    const apolloServer = new ApolloServer({
        schema,
        context,
        playground: true
    });

    const app = express();
    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
};
