import React from 'react';
import NextApp, { AppInitialProps } from 'next/app';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import red from '@material-ui/core/colors/red';
import Skeleton from '@material-ui/lab/Skeleton';

import withAuth, { AuthProps } from '../container/withAuth';
import withApollo, { ApolloProps } from '../container/withApollo';
import Content from '../container/content';

import Login from '../components/login';
import Head from '../components/head';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c90024'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff'
        }
    }
});

class App extends NextApp<AppInitialProps & ApolloProps & AuthProps> {
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
            user,
            signInWithEmailAndPassword,
            createUserWithEmailAndPassword,
            signOut,
            loading,
            error
        } = this.props;

        const showLogin = !loading && !user;
        const showSkeleton = loading || !user;

        return (
            <ApolloProvider client={apollo}>
                <ThemeProvider theme={theme}>
                    <Head />
                    {showLogin && (
                        <Login
                            loading={loading}
                            signInWithEmailAndPassword={
                                signInWithEmailAndPassword
                            }
                            createUserWithEmailAndPassword={
                                createUserWithEmailAndPassword
                            }
                            error={error}
                        />
                    )}
                    <Content signOut={signOut}>
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
                            <Component {...pageProps} />
                        )}
                    </Content>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

export default withApollo(withAuth(App));
