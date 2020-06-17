/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import {
    MemberTable,
    MemberTableProps
} from '../components/memberTable/memberTable';

faker.locale = 'de';
faker.seed(4);

const defaultProps: MemberTableProps = Object.freeze({
    networkStatus: null,
    loading: false,
    error: null,
    data: {
        allPersons: [
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            },
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            },
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            },
            {
                id: faker.random.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName()
            }
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
