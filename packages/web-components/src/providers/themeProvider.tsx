/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';
import red from '@material-ui/core/colors/red';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

export interface ThemeProviderProps {
    children: JSX.Element | (false | JSX.Element)[];
}

export class ThemeProvider extends React.Component<ThemeProviderProps> {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { children } = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StyledComponentThemeProvider theme={theme}>
                    <>{children}</>
                </StyledComponentThemeProvider>
            </MuiPickersUtilsProvider>
        );
    }
}
