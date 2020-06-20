import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SideBar, SideBarProps } from '../index';

const defaultProps: SideBarProps = {
    handleDrawerClose: () => {},
    open: true
};

storiesOf('SideBar', module)
    .add('Open', () => {
        const props: SideBarProps = {
            ...defaultProps,
            open: true
        };
        return <SideBar {...props} />;
    })
    .add('Closed', () => {
        const props: SideBarProps = {
            ...defaultProps,
            open: false
        };
        return <SideBar {...props} />;
    });
