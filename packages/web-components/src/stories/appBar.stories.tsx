import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppBar, AppBarProps, authPropsMock } from '../index';

const defaultProps: AppBarProps = {
    ...authPropsMock,
    handleDrawerOpen: () => {},
    open: true,
    isSidebarDisabled: false,
    auth: {
        signOut: () => {},
        signInWithEmailAndPassword: async () => {},
        signInWithGoogle: async () => {},
        signInWithMicrosoft: async () => {}
    }
};

storiesOf('AppBar', module)
    .add('Open', () => {
        const props: AppBarProps = {
            ...defaultProps,
            open: true
        };
        return <AppBar {...props} />;
    })
    .add('Closed', () => {
        const props: AppBarProps = {
            ...defaultProps,
            open: false
        };
        return <AppBar {...props} />;
    });
