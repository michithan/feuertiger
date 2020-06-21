import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import dynamic from 'next/dynamic';
import {
    MemberDetailsProps,
    MemberDetails,
    LoadingContainer
} from '@feuertiger/web-components';
import {
    PersonDetailsDocument,
    PersonDetailsQueryResult,
    UpdatePersonDocument,
    Person
} from '@feuertiger/schema-graphql';

export default dynamic(
    async () => () => {
        const router = useRouter();
        const { id } = router.query;

        const { data, loading } = useQuery(PersonDetailsDocument, {
            variables: { id }
        }) as PersonDetailsQueryResult;

        const [updatePerson] = useMutation(UpdatePersonDocument);

        const { member } = data || {};
        const memberDetailsProps: MemberDetailsProps = {
            member: member as Person,
            updatePerson
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
