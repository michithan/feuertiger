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
        const { loading, error, data } = useQuery(AllExercisesDocument);
        const copy: ExerciseTableProps = {
            allExercises: data?.allExercises?.map(exercise => ({
                ...exercise
            }))
        };
        return (
            <LoadingContainer loading={loading} error={error}>
                <ExerciseTable {...copy} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Exercices;
