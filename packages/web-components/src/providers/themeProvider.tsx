import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { de } from 'date-fns/locale';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#c90024'
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
            <StyledComponentThemeProvider theme={theme}>
                <MuiThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={de}>
                        <>{children}</>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            </StyledComponentThemeProvider>
        );
    }
}
