import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    styled
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2)
}));

const StyledTypography = styled(Typography)(() => ({
    flexGrow: 1
}));

const Nav = () => (
    <AppBar position="static">
        <Toolbar>
            <StyledIconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
            </StyledIconButton>
            <StyledTypography variant="h6">News</StyledTypography>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
);

export default Nav;
