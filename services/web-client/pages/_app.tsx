import React from 'react';
import NextApp, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import Skeleton from '@material-ui/lab/Skeleton';

import { Container, ThemeProvider, Login } from '@feuertiger/web-components';
import withAuth, { AuthProps, AuthStateProps } from '../container/withAuth';
import withApollo, { ApolloProps } from '../container/withApollo';

interface Props
    extends AppInitialProps,
        ApolloProps,
        AuthProps,
        AuthStateProps {}

class App extends NextApp<Props> {
    // remove it here
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
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
        const showSkeleton = isLoading || !isSignedIn;

        return (
            <ApolloProvider client={apollo}>
                <ThemeProvider>
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
                    {showLogin && <Login auth={auth} />}
                    <Container auth={auth}>
                        {showSkeleton ? (
                            <>
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                                <Skeleton height={40} />
                                <Skeleton variant="rect" height={190} />
                            </>
                        ) : (
                            // eslint-disable-next-line
                            <Component {...pageProps} />
                        )}
                    </Container>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

const appWithAuth = (withAuth(App) as unknown) as typeof NextApp;
export default withApollo(appWithAuth);
