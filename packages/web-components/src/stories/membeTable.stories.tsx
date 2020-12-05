import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import {
    MemberTable,
    MemberTableProps,
    authPropsMock,
    Container,
    ContainerProps,
    mockFetchConnection
} from '../index';
import { mockDefaultDepartmentMember } from '../mocks/departmentMembers.mock';

const defaultContainerProps: ContainerProps = {
    ...authPropsMock,
    children: null
};

faker.locale = 'de';
faker.seed(4);

const defaultProps: MemberTableProps = {
    fetchDepartmentMembers: mockFetchConnection([
        mockDefaultDepartmentMember(),
        mockDefaultDepartmentMember(),
        mockDefaultDepartmentMember(),
        mockDefaultDepartmentMember()
    ])
};

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
