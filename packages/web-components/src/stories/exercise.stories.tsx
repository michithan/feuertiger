/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { Exercise, ExerciseProps } from '../components/exercise/exercise';

faker.locale = 'de';
faker.seed(4);

const defaultProps: ExerciseProps = Object.freeze({
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
} as unknown) as ExerciseProps;

storiesOf('Exercise', module)
    .add('Default', () => {
        const props: ExerciseProps = {
            ...defaultProps
        };
        props.loading = false;
        props.error = null;
        return <Exercise {...props} />;
    })
    .add('Loading', () => {
        const props: ExerciseProps = {
            ...defaultProps
        };
        props.loading = true;
        props.error = null;
        return <Exercise {...props} />;
    })
    .add('Error', () => {
        const props: ExerciseProps = {
            ...defaultProps
        };
        props.loading = false;
        props.error = { message: 'error' } as any;
        return <Exercise {...props} />;
    });
