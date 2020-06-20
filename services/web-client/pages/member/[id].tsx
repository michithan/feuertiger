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
    Person,
    UpdatePersonDocument
} from '@feuertiger/schema-graphql';

export default dynamic(
    async () => () => {
        const router = useRouter();
        const { id } = router.query;

        const queryResult = useQuery(PersonDetailsDocument, {
            variables: { id }
        }) as PersonDetailsQueryResult;

        const [updatePerson] = useMutation(UpdatePersonDocument);

        const memberDetailsProps: MemberDetailsProps = {
            ...queryResult,
            member: queryResult?.data?.node as Person,
            updatePerson
        };
        return (
            <LoadingContainer loading={queryResult.loading}>
                <MemberDetails {...memberDetailsProps} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);
