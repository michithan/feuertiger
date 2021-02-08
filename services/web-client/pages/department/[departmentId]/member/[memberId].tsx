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

const MemberPage = dynamic(
    async () => () => {
        const {
            query: { memberId }
        } = useRouter();

        const { data, loading, error } = useQuery(PersonDetailsDocument, {
            variables: { id: memberId }
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

export default MemberPage;
