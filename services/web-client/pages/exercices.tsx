import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import {
    LoadingContainer,
    ExerciseTable,
    ExerciseTableProps
} from '@feuertiger/web-components';
import { AllExercisesDocument } from '@feuertiger/schema-graphql';

const Exercices = dynamic(
    async () => () => {
        const props = useQuery(AllExercisesDocument);
        const exercisesProps: ExerciseTableProps = {
            ...props,
            data: {
                allExercises: props?.data?.allExercises?.map(exercise => ({
                    ...exercise
                }))
            }
        };
        return (
            <LoadingContainer loading={props.loading}>
                <ExerciseTable {...exercisesProps} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Exercices;
