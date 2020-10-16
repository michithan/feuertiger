import React, { ReactNode } from 'react';
import {
    createMuiTheme,
    CssBaseline,
    ThemeProvider as MuiThemeProvider
} from '@material-ui/core';
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
    children: JSX.Element;
}

export class ThemeProvider extends React.Component<ThemeProviderProps> {
    componentDidMount(): void {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render(): ReactNode {
        const { children } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={de}>
                    <StyledComponentThemeProvider theme={theme}>
                        {children}
                    </StyledComponentThemeProvider>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}
