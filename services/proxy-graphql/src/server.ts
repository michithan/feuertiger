import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import admin from 'firebase-admin';
import { AuthenticationError } from 'apollo-server';
import resolvers from './resolver';
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
        resolvers,
        context: async ({ req }) => {
            const token = req.headers.authorization || '';
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                return {
                    user: {
                        uid: decodedToken.uid
                    }
                };
            } catch (error) {
                throw new AuthenticationError('you must be logged in');
            }
        },
        playground: true
    });

    const app = express();
    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
};
