/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import NextApp, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import {
    Container,
    ThemeProvider,
    Login,
    AuthProps
} from '@feuertiger/web-components';
import withAuth, { AuthStateProps } from '../container/withAuth';
import withApollo, { ApolloProps } from '../container/withApollo';

interface Props
    extends AppInitialProps,
        ApolloProps,
        AuthProps,
        AuthStateProps {}

class App extends NextApp<Props> {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles?.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

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
                <Head>
                    <title>Feuertiger</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                </Head>
                <ThemeProvider>
                    {showLogin && <Login auth={auth} />}
                    <Container auth={auth}>
                        <Component {...pageProps} />
                    </Container>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

const appWithAuth = withAuth(App);
export default withApollo(appWithAuth);
