/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
    AddExerciseComponent,
    AddExerciseComponentProps
} from '../components/addExercise/addExerciseComponent';

const defaultProps: AddExerciseComponentProps = {
    handleClose: () => {},
    open: true
};

storiesOf('AddExercise', module).add('Default', () => {
    const props: AddExerciseComponentProps = {
        ...defaultProps,
        open: true
    };
    return <AddExerciseComponent {...props} />;
});
