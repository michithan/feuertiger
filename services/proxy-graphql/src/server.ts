import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import resolvers from './resolver';
import schemaDirectives from './schemaDirectives';

export const gqlServer = () => {
    const schemaPath = require.resolve(
        '@feuertiger/schema-graphql/dist/schema.graphql'
    );

    const typeDefs = importSchema(schemaPath);

    const apolloServer = new ApolloServer({
        typeDefs,
        schemaDirectives,
        resolvers
    });

    const app = express();
    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
};
