import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
    DataExtractor,
    DataExtractorProps
} from '../components/dataExtractor/dataExtractor';
import { Container, ContainerProps, authPropsMock } from '../index';

const defaultProps: DataExtractorProps = {};
const defaultContainerProps: ContainerProps = {
    ...authPropsMock,
    children: null
};

storiesOf('DataExtractor', module)
    .add('Default', () => {
        const props: DataExtractorProps = {
            ...defaultProps
        };
        return <DataExtractor {...props} />;
    })
    .add('Contaienrd', () => {
        const props: DataExtractorProps = {
            ...defaultProps
        };
        return (
            <Container {...defaultContainerProps}>
                <DataExtractor {...props} />
            </Container>
        );
    });
