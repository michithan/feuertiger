import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { Container as MuiContainer } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { AppBar, SideBar, AuthProps } from '../../index';

export interface ContainerProps extends AuthProps {
    children: ReactElement | null;
}

interface State {
    open: boolean;
}

const StyledMain = styled.main`
    flex-grow: 1;
    overflow: auto;
    margin-top: ${({ theme }) => theme.spacing(7)}px;
    height: calc(100vh - ${({ theme }) => theme.spacing(7)}px);

    @media (min-width: ${({ theme }) =>
            theme.breakpoints.values.xs}px) and (orientation: landscape) {
        margin-top: 48px;
        height: calc(100vh - ${({ theme }) => theme.spacing(6)}px);
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
        margin-top: 64px;
        height: calc(100vh - ${({ theme }) => theme.spacing(8)}px);
    }
`;

const StyledContainer = styled(MuiContainer)`
    padding-top: ${({ theme }) => theme.spacing(4)}px;
    padding-bottom: ${({ theme }) => theme.spacing(4)}px;
`;

const RootDiv = styled.div`
    display: flex;
`;

export class Container extends React.Component<ContainerProps, State> {
    constructor(props: ContainerProps) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleDrawerOpen = (): void => this.setState({ open: true });

    handleDrawerClose = (): void => this.setState({ open: false });

    render(): ReactNode {
        const { open } = this.state;
        const { children, auth } = this.props;
        return (
            <RootDiv>
                <AppBar
                    open={open}
                    handleDrawerOpen={this.handleDrawerOpen}
                    auth={auth}
                />
                <SideBar
                    open={open}
                    handleDrawerClose={this.handleDrawerClose}
                />
                <StyledMain>
                    <SnackbarProvider maxSnack={3}>
                        <StyledContainer maxWidth="lg">
                            {children}
                        </StyledContainer>
                    </SnackbarProvider>
                </StyledMain>
            </RootDiv>
        );
    }
}
