import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import {
    MemberDetails,
    MemberDetailsProps,
    Container,
    ContainerProps,
    authPropsMock,
    mockDefaultPerson
} from '../index';

const defaultContainerProps: ContainerProps = {
    ...authPropsMock,
    children: null
};

faker.locale = 'de';
faker.seed(4);

const defaultProps: MemberDetailsProps = Object.freeze({
    member: mockDefaultPerson(),
    updatePerson: () => {},
    updatePersonExercisesConnection: () => {}
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
