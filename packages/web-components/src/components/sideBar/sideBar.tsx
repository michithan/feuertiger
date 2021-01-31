import React, { ReactElement } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import {
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExerciseIcon from '@material-ui/icons/SportsKabaddi';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import OperationIcon from '@material-ui/icons/Whatshot';

const drawerWidth = 240;

const drawerClosed = ({ theme }) => css`
    overflow-x: hidden;
    width: ${theme.spacing(7)}px;
    ${theme.breakpoints.up('sm')} {
        width: ${theme.spacing(9)}px;
    }
`;

// eslint-disable-next-line
const StyledDrawer = styled(({ open, ...props }) => <Drawer {...props} />)`
    > div {
        height: 100vh;
        position: relative;
        transition: ${({ open, theme: { transitions } }) =>
            transitions.create('width', {
                easing: transitions.easing.sharp,
                duration: open
                    ? transitions.duration.enteringScreen
                    : transitions.duration.leavingScreen
            })};
        white-space: nowrap;
        width: ${drawerWidth}px;
        overflow-x: hidden;
        z-index: 0;
        ${({ open, theme }) => (open ? '' : drawerClosed({ theme }))}
    }
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    ${({ theme: { mixins } }) => mixins.toolbar}
`;

export interface SideBarProps {
    open: boolean;
    handleDrawerClose: () => void;
    departmentId?: string | undefined;
}

interface MainListItemsProps {
    departmentId: string;
}

export const MainListItems = ({
    departmentId
}: MainListItemsProps): ReactElement => (
    <div>
        <Link href={`/department/${departmentId}`}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <Link href={`/department/${departmentId}/member`}>
            <ListItem button>
                <ListItemIcon>
                    <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Mitglieder" />
            </ListItem>
        </Link>
        <Link href={`/department/${departmentId}/exercises`}>
            <ListItem button>
                <ListItemIcon>
                    <ExerciseIcon />
                </ListItemIcon>
                <ListItemText primary="Übungen" />
            </ListItem>
        </Link>
        <Link href={`/department/${departmentId}/operations`}>
            <ListItem button>
                <ListItemIcon>
                    <OperationIcon />
                </ListItemIcon>
                <ListItemText primary="Einsätze " />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = <div />;

export const SideBar = ({
    open,
    departmentId,
    handleDrawerClose
}: SideBarProps): ReactElement => (
    <StyledDrawer variant="permanent" open={open}>
        <StyledDiv>
            <IconButton id="sidebar-close-button" onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </StyledDiv>
        <Divider />
        {departmentId && (
            <List>
                <MainListItems departmentId={departmentId} />
            </List>
        )}
        <Divider />
        <List>{secondaryListItems}</List>
    </StyledDrawer>
);
