import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import {
    MemberDetailsProps,
    MemberDetails,
    LoadingContainer
} from '@feuertiger/web-components';
import {
    PersonDetailsDocument,
    PersonDetailsQueryResult,
    Person
} from '@feuertiger/schema-graphql';

export default dynamic(
    async () => () => {
        const router = useRouter();
        const { id } = router.query;
        const props = useQuery(PersonDetailsDocument, {
            variables: { id }
        }) as PersonDetailsQueryResult;
        const memberDetailsProps: MemberDetailsProps = {
            ...props,
            member: props?.data?.node as Person
        };
        return (
            <LoadingContainer loading={props.loading}>
                <MemberDetails {...memberDetailsProps} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);
