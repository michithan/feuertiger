import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useQuery, useMutation } from '@apollo/client';
import {
    MemberDetailsProps,
    MemberDetails,
    LoadingContainer
} from '@feuertiger/web-components';
import {
    PersonDetailsDocument,
    UpdatePersonDocument,
    UpdatePersonExercisesConnectionDocument
} from '@feuertiger/schema-graphql';

const Member = dynamic(
    async () => () => {
        const router = useRouter();
        const { id } = router.query;

        const { data, loading, error } = useQuery(PersonDetailsDocument, {
            variables: { id }
        });

        const [updatePerson, { data: personUpdate }] = useMutation(
            UpdatePersonDocument
        );
        const [
            updatePersonExercisesConnection,
            { data: personExercisesUpdate }
        ] = useMutation(UpdatePersonExercisesConnectionDocument);

        const memberDetailsProps: MemberDetailsProps = {
            ...data,
            ...personUpdate,
            ...personExercisesUpdate,
            updatePerson,
            updatePersonExercisesConnection
        };

        return (
            <LoadingContainer loading={loading} error={error}>
                <MemberDetails {...memberDetailsProps} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Member;
