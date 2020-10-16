import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import {
    MemberTable,
    MemberTableProps,
    mockDefaultPerson,
    authPropsMock,
    Container,
    ContainerProps
} from '../index';

const defaultContainerProps: ContainerProps = {
    ...authPropsMock,
    children: null
};

faker.locale = 'de';
faker.seed(4);

const defaultProps: MemberTableProps = Object.freeze({
    allPersons: [
        mockDefaultPerson(),
        mockDefaultPerson(),
        mockDefaultPerson(),
        mockDefaultPerson()
    ]
} as unknown) as MemberTableProps;

storiesOf('MemberTable', module)
    .add('Default', () => {
        const props: MemberTableProps = {
            ...defaultProps
        };
        return <MemberTable {...props} />;
    })
    .add('With Container', () => {
        const props: MemberTableProps = {
            ...defaultProps
        };
        return (
            <Container {...defaultContainerProps}>
                <MemberTable {...props} />
            </Container>
        );
    });
