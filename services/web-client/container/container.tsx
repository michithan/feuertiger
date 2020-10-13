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
import withApollo, { ApolloProps } from './withApollo';

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
    let content = <Component {...pageProps} />;
    if (isSignedIn) {
        content = <Component {...pageProps} />;
    } else if (isSignInLoading) {
        content = null;
    }
    return (
        <ThemeProvider>
            <ApolloProvider client={apollo}>
                <UiContainer auth={auth}>{content}</UiContainer>
            </ApolloProvider>
        </ThemeProvider>
    );
};

export const Container = withApollo(withAuth(ContainerWithAuth));
