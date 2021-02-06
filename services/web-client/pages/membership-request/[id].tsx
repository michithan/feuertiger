import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingContainer } from '@feuertiger/web-components';
import { MembershipRequestDocument } from '@feuertiger/schema-graphql';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

const MembershipRequest = dynamic(
    async () => () => {
        const {
            query: { id }
        } = useRouter();

        const { data, error } = useQuery(MembershipRequestDocument, {
            variables: { id }
        });

        return (
            <LoadingContainer loading={!data} error={error}>
                <p>Running Membership Request</p>
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default MembershipRequest;
