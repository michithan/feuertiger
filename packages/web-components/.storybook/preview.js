import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '../src/providers/themeProvider';

export const decorators = [
    Story => (
        <ThemeProvider>
            <SnackbarProvider maxSnack={3}>
                <Story />
            </SnackbarProvider>
        </ThemeProvider>
    )
];
