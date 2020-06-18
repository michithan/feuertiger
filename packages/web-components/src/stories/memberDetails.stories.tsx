/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import {
    MemberDetails,
    MemberDetailsProps
} from '../components/memberDetails/memberDetails';
import { Container, ContainerProps } from '../components/container/container';
import { authPropsMock } from '../mocks/authProps.mock';

import { mockDefaultPerson } from '../mocks/persons.mock';

const defaultContainerProps: ContainerProps = {
    ...authPropsMock
};

faker.locale = 'de';
faker.seed(4);

const defaultProps: MemberDetailsProps = Object.freeze({
    member: mockDefaultPerson()
} as unknown) as MemberDetailsProps;

storiesOf('MemberDetails', module)
    .add('Default', () => {
        const props: MemberDetailsProps = {
            ...defaultProps
        };
        return <MemberDetails {...props} />;
    })
    .add('With Container', () => {
        const props: MemberDetailsProps = {
            ...defaultProps
        };
        return (
            <Container {...defaultContainerProps}>
                <MemberDetails {...props} />
            </Container>
        );
    });
