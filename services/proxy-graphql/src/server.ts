import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import createResolver from './createResolver';
import resolveContext from './resolveContext';
import schemaDirectives from './schemaDirectives';

// eslint-disable-next-line import/prefer-default-export
export const gqlServer = () => {
    const schemaPath = require.resolve(
        '@feuertiger/schema-graphql/dist/schema.graphql'
    );

    const typeDefs = importSchema(schemaPath);

    const apolloServer = new ApolloServer({
        typeDefs,
        schemaDirectives,
        resolvers: createResolver(),
        context: resolveContext,
        playground: true
    });

    const app = express();
    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
};
