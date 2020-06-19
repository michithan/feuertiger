import React from 'react';
import NextApp, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import { Container } from '../container/container';
import withApollo, { ApolloProps } from '../container/withApollo';

@withApollo
export default class App extends NextApp<AppInitialProps & ApolloProps> {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles?.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return (
            <>
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
                <Container {...(this.props as any)} />
            </>
        );
    }
}
