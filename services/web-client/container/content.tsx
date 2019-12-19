import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CssBaseline, Container } from '@material-ui/core';
import AppBar from '../components/appBar';
import SideBar from '../components/sideBar';

type Props = {
    children?: ReactNode;
};

type State = {
    open: boolean;
};

const StyledMain = styled.main`
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
`;

const AppBarSpacer = styled.div`
    ${({ theme }) => theme.mixins.toolbar}
`;

const StyledContainer = styled(Container)`
    padding-top: ${({ theme }) => theme.spacing(4)}px;
    padding-bottom: ${({ theme }) => theme.spacing(4)}px;
`;

const RootDiv = styled.div`
    display: flex;
`;

export default class Conntent extends React.Component<Props, State> {
    state: State = {
        open: false
    };

    handleDrawerOpen = () => this.setState({ open: true });

    handleDrawerClose = () => this.setState({ open: false });

    render() {
        const { open } = this.state;
        const { children } = this.props;
        return (
            <RootDiv>
                <CssBaseline />
                <AppBar open={open} handleDrawerOpen={this.handleDrawerOpen} />
                <SideBar
                    open={open}
                    handleDrawerClose={this.handleDrawerClose}
                />
                <StyledMain>
                    <AppBarSpacer />
                    <StyledContainer maxWidth="lg">{children}</StyledContainer>
                </StyledMain>
            </RootDiv>
        );
    }
}
