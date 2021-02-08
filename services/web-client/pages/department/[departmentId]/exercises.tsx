import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import {
    LoadingContainer,
    ExerciseTable,
    ExerciseTableProps
} from '@feuertiger/web-components';
import {
    ExercisesQueryVariables,
    ExercisesQuery,
    ExercisesDocument
} from '@feuertiger/schema-graphql';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';
import { useRouter } from 'next/router';

const Exercises = dynamic(
    async () => () => {
        const {
            query: { departmentId }
        } = useRouter();
        const query = useQuery<ExercisesQuery, ExercisesQueryVariables>(
            ExercisesDocument,
            {
                variables: {
                    query: {
                        page: 0,
                        pageSize: 5
                    }
                }
                //fetchPolicy: departmentId ? 'cache-and-network' : 'standby'
            }
        );
        const { loading, error } = query;

        const linkToExercise = (
            exercise: ExercisesQuery['exercises']['edges'][0]['node']
        ) => ({
            href: '/department/[departmentId]/exercises/[exerciseId]',
            as: `/department/${departmentId}/exercises/${exercise.id}`
        });

        const props: ExerciseTableProps = {
            linkToExercise,
            fetchExercises: createMaterialTableFetchFunction<
                ExercisesQuery,
                ExercisesQuery['exercises']['edges'][0]['node'],
                ExercisesQueryVariables
            >(query, ({ data: { exercises } }) => exercises)
        };

        return (
            <LoadingContainer loading={loading} error={error}>
                <ExerciseTable {...props} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Exercises;
