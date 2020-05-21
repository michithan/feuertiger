/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { Member, MemberProps } from '../components/member/member';

const defaultProps: MemberProps = Object.freeze({
    data: {
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
    }
} as unknown) as MemberProps;

storiesOf('Member', module)
    .add('Default', () => {
        const props: MemberProps = {
            ...defaultProps
        };
        props.data.loading = false;
        props.data.error = null;
        return <Member {...props} />;
    })
    .add('Loading', () => {
        const props: MemberProps = {
            ...defaultProps
        };
        props.data.loading = true;
        props.data.error = null;
        return <Member {...props} />;
    })
    .add('Error', () => {
        const props: MemberProps = {
            ...defaultProps
        };
        props.data.loading = false;
        props.data.error = { message: 'error' } as any;
        return <Member {...props} />;
    });
