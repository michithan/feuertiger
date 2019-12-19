import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';

import resolvers from './resolver';
import schemaDirectives from './schemaDirectives';

const schemaPath = require.resolve(
    '@feuertiger/schema-graphql/dist/schema.graphql'
);

const typeDefs = importSchema(schemaPath);

const server = new ApolloServer({
    typeDefs,
    schemaDirectives,
    resolvers
});

server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
});
