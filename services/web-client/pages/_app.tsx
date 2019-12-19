import React from 'react';
import NextApp, { AppInitialProps } from 'next/app';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import red from '@material-ui/core/colors/red';

import withAuth from '../container/withAuth';
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

class App extends NextApp<AppInitialProps & ApolloProps> {
    // remove it here
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, apollo } = this.props;

        return (
            <ApolloProvider client={apollo}>
                <ThemeProvider theme={theme}>
                    <Head />
                    <Login />
                    <Content>
                        <Component {...pageProps} />
                    </Content>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

export default withApollo(withAuth(App));
// export default withApollo(App);
