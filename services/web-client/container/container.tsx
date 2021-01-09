import React, { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';
import {
    Container as UiContainer,
    ThemeProvider,
    Login,
    AuthProps,
    LoadingSkeleton
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
    if (isSignInLoading) {
        content = <LoadingSkeleton />;
    } else if (!isSignedIn) {
        content = <Login auth={auth} />;
    }
    return (
        <ThemeProvider>
            <ApolloProvider client={apollo}>
                <UiContainer auth={auth} departmentId={null}>
                    {content}
                </UiContainer>
            </ApolloProvider>
        </ThemeProvider>
    );
};

export const Container = withApollo(withAuth(ContainerWithAuth));
