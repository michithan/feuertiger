import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';
import { default as NextApp, AppProps } from 'next/app';

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = 'http://localhost:4000/';

const link = createHttpLink({
    fetch, // Switches between unfetch & node-fetch for client & server.
    uri: GRAPHQL_URL
});

export interface ApolloProps {
    apollo: any;
}

// You can get headers and ctx (context) from the callback params
// e.g. ({ headers, ctx, initialState })
const initClient = ({ initialState }) =>
    new ApolloClient({
        link,
        cache: new InMemoryCache()
            //  rehydrate the cache using the initial data passed from the server:
            .restore(initialState || {})
    });

export default (App: typeof NextApp) =>
    withApollo(initClient)(App) as React.ComponentType<AppProps>;
