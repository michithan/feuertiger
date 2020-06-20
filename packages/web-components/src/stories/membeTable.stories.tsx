import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { MemberTable, MemberTableProps, mockDefaultPerson } from '../index';

faker.locale = 'de';
faker.seed(4);

const defaultProps: MemberTableProps = Object.freeze({
    networkStatus: null,
    loading: false,
    error: null,
    data: {
        allPersons: [
            mockDefaultPerson(),
            mockDefaultPerson(),
            mockDefaultPerson(),
            mockDefaultPerson()
        ]
    }
} as unknown) as MemberTableProps;

storiesOf('MemberTable', module)
    .add('Default', () => {
        const props: MemberTableProps = {
            ...defaultProps
        };
        props.loading = false;
        props.error = null;
        return <MemberTable {...props} />;
    })
    .add('Loading', () => {
        const props: MemberTableProps = {
            ...defaultProps
        };
        props.loading = true;
        props.error = null;
        return <MemberTable {...props} />;
    })
    .add('Error', () => {
        const props: MemberTableProps = {
            ...defaultProps
        };
        props.loading = false;
        props.error = { message: 'error' } as any;
        return <MemberTable {...props} />;
    });
