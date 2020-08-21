import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, ContainerProps, authPropsMock } from '../index';

const defaultProps: ContainerProps = {
    ...authPropsMock,
    children: null
};

storiesOf('Container', module)
    .add('Default', () => {
        const props: ContainerProps = {
            ...defaultProps
        };
        return <Container {...props} />;
    })
    .add('With empty content', () => {
        const props: ContainerProps = {
            ...defaultProps
        };
        return (
            <Container {...props}>
                <br />
            </Container>
        );
    })
    .add('With y overflow', () => {
        const props: ContainerProps = {
            ...defaultProps
        };
        return (
            <Container {...props}>
                <>
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                </>
            </Container>
        );
    });
