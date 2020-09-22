import React, { ReactElement } from 'react';
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

export const ContainerWithAuth = ({
    Component,
    pageProps,
    apollo,
    auth,
    isLoading: isSignInLoading,
    isSignedIn
}: ContainerProps): ReactElement => {
    const showLogin = !isSignedIn || isSignInLoading;
    return (
        <ApolloProvider client={apollo}>
            <ThemeProvider>
                <UiContainer auth={auth}>
                    {showLogin ? (
                        <Login auth={auth} />
                    ) : (
                        Component && <Component {...pageProps} />
                    )}
                </UiContainer>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export const Container = withAuth(ContainerWithAuth);
