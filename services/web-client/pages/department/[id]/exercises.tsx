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
            query: { id }
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
            }
        );
        const { loading, error } = query;
        const copy: ExerciseTableProps = {
            fetchExercises: createMaterialTableFetchFunction<
                ExercisesQuery,
                ExercisesQuery['exercises']['edges'][0]['node'],
                ExercisesQueryVariables
            >(query, ({ data: { exercises } }) => exercises)
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

export default Exercises;
