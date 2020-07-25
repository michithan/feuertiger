import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppBar, AppBarProps, authPropsMock } from '../index';

const defaultProps: AppBarProps = {
    ...authPropsMock,
    handleDrawerOpen: () => {},
    open: true
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
