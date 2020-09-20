import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DataExtractor } from '../components/dataExtractor/dataExtractor';
import { Container, ContainerProps, authPropsMock } from '../index';

const defaultContainerProps: ContainerProps = {
    ...authPropsMock,
    children: null
};

storiesOf('DataExtractor', module)
    .add('Default', () => <DataExtractor />)
    .add('Contaienrd', () => (
        <Container {...defaultContainerProps}>
            <DataExtractor />
        </Container>
    ));
