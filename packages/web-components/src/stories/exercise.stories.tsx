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
        allExercises: [
            {
                id: faker.random.uuid(),
                topic: faker.random.word(),
                timeslot: faker.date.future().toUTCString()
            },
            {
                id: faker.random.uuid(),
                topic: faker.random.word(),
                timeslot: faker.date.future().toUTCString()
            },
            {
                id: faker.random.uuid(),
                topic: faker.random.word(),
                timeslot: faker.date.future().toUTCString()
            },
            {
                id: faker.random.uuid(),
                topic: faker.random.word(),
                timeslot: faker.date.future().toUTCString()
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
