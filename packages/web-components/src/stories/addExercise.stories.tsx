/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
    AddExerciseComponent,
    AddExerciseComponentProps
} from '../components/addExercise/addExerciseComponent';

const defaultProps: AddExerciseComponentProps = {
    name: 'michi'
};

storiesOf('AddExercise', module)
    .add('Michi', () => {
        const props: AddExerciseComponentProps = {
            ...defaultProps
        };
        return <AddExerciseComponent {...props} />;
    })
    .add('Mina', () => {
        const props: AddExerciseComponentProps = {
            ...defaultProps,
            name: 'mina'
        };
        return <AddExerciseComponent {...props} />;
    });