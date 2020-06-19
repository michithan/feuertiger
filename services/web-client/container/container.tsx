import React from 'react';
import { ApolloProvider } from '@apollo/client';
import {
    Container as UiContainer,
    ThemeProvider,
    Login,
    AuthProps
} from '@feuertiger/web-components';
import { AppInitialProps, AppProps } from 'next/app';
import withAuth, { AuthStateProps } from './withAuth';
import { ApolloProps } from './withApollo';

export interface ContainerProps
    extends AppProps,
        AppInitialProps,
        ApolloProps,
        AuthProps,
        AuthStateProps {}

@withAuth
export class Container extends React.Component<ContainerProps, any, any> {
    render() {
        const {
            Component,
            pageProps,
            apollo,
            auth,
            isLoading,
            isSignedIn
        } = this.props;

        const showLogin = !isLoading && !isSignedIn;

        return (
            <ApolloProvider client={apollo}>
                <ThemeProvider>
                    <UiContainer auth={auth}>
                        {showLogin && <Login auth={auth} />}
                        {Component && <Component {...pageProps} />}
                    </UiContainer>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}
