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
    PersonDetailsQueryResult,
    UpdatePersonDocument,
    Person,
    UpdatePersonExercisesConnectionDocument
} from '@feuertiger/schema-graphql';

const member = dynamic(
    async () => () => {
        const router = useRouter();
        const { id } = router.query;

        const { data, loading } = useQuery(PersonDetailsDocument, {
            variables: { id }
        }) as PersonDetailsQueryResult;

        const [updatePerson] = useMutation(UpdatePersonDocument);
        const [updatePersonExercisesConnection] = useMutation(
            UpdatePersonExercisesConnectionDocument
        );

        const { member } = data || {};
        const memberDetailsProps: MemberDetailsProps = {
            member: member as Person,
            updatePerson,
            updatePersonExercisesConnection
        };
        return (
            <LoadingContainer loading={loading || !member}>
                <MemberDetails {...memberDetailsProps} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default member;
