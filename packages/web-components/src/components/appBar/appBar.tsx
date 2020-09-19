import React, { ReactNode } from 'react';
import styled from 'styled-components';
import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { AuthProps } from '../../index';

const drawerWidth = 240;

const StyledAppBar = styled(({ open, ...props }) => <MuiAppBar {...props} />)`
    z-index: 1;
    transition: ${({ open, theme: { transitions } }) =>
        transitions.create(['width', 'margin'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.leavingScreen
        }) + open
            ? transitions.create(['width', 'margin'], {
                  easing: transitions.easing.sharp,
                  duration: transitions.duration.enteringScreen
              })
            : ''} !important;
    ${({ open }) =>
        open
            ? `
    margin-left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px) !important;`
            : ''}
`;

const StyledToolbar = styled(Toolbar)`
    padding-right: 24;
`;

const StyledIconButton = styled(({ open, ...props }) => (
    <IconButton {...props} />
))`
    margin-right: 36;
    display: ${({ open }) => (open ? 'none' : 'unset')};
`;

const StyledTypography = styled(Typography)`
    flex-grow: 1;
    display: flex;
    justify-self: center;
    justify-content: center;
`;

export interface AppBarProps extends AuthProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

export class AppBar extends React.Component<AppBarProps> {
    handleLogout = (): void => {
        const { auth } = this.props;
        auth.signOut();
    };

    render(): ReactNode {
        const { open, handleDrawerOpen } = this.props;
        return (
            <StyledAppBar open={open}>
                <StyledToolbar>
                    <StyledIconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        open={open}
                    >
                        <MenuIcon />
                    </StyledIconButton>
                    <StyledTypography variant="h6" color="inherit" noWrap>
                        <span role="img" aria-label="Feuer">
                            🔥
                        </span>
                        <span>Feuertiger</span>
                        <span role="img" aria-label="Tiger">
                            🐯
                        </span>
                    </StyledTypography>
                    <IconButton
                        color="inherit"
                        onClick={this.handleLogout}
                        id="app-bar-exit-button"
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </StyledToolbar>
            </StyledAppBar>
        );
    }
}
