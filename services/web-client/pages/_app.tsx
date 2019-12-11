import React from 'react';
import NextApp from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../utils/apollo-client';

const theme = {
    primary: 'green'
};

interface IProps {
    apollo: any;
}
class App extends NextApp<IProps> {
    // remove it here
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode)
            jssStyles.parentNode.removeChild(jssStyles);
    }

    render() {
        const { Component, pageProps, apollo } = this.props;

        return (
            <ApolloProvider client={apollo}>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}

export default withData(App);
