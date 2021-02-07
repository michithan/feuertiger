import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import { AuthProps, Link } from '../../index';

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

const StyledMenuItem = styled(MenuItem)`
    &:focus {
        background-color: ${({ theme }) => theme.palette.primary.main};
        & .MuiListItemIcon-root,
        & .MuiListItemText-primary {
            color: ${({ theme }) => theme.palette.common.white};
        }
    }
`;

export interface AppBarProps extends AuthProps {
    open: boolean;
    isSidebarDisabled: boolean;
    handleDrawerOpen: () => void;
}

export const AppBar = ({
    auth,
    open,
    isSidebarDisabled,
    handleDrawerOpen
}: AppBarProps): ReactElement => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (): void => auth.signOut();

    return (
        <StyledAppBar open={open}>
            <StyledToolbar>
                <StyledIconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    disabled={isSidebarDisabled}
                    onClick={handleDrawerOpen}
                    open={!isSidebarDisabled && open}
                >
                    {!isSidebarDisabled && <MenuIcon />}
                </StyledIconButton>
                <StyledTypography variant="h6" color="inherit" noWrap>
                    <Link href="/" inherit>
                        <span role="img" aria-label="Feuer">
                            🔥
                        </span>
                        <span>Feuertiger</span>
                        <span role="img" aria-label="Tiger">
                            🐯
                        </span>
                    </Link>
                </StyledTypography>
                <IconButton
                    color="inherit"
                    onClick={handleClick}
                    id="app-bar-exit-button"
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </StyledMenuItem>
                    <Divider />
                    <Link href="/admin" inherit>
                        <StyledMenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <SupervisorAccountIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Admin" />
                        </StyledMenuItem>
                    </Link>
                </Menu>
            </StyledToolbar>
        </StyledAppBar>
    );
};
