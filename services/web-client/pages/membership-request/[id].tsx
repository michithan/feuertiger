import React from 'react';
import dynamic from 'next/dynamic';
import {
    LoadingContainer,
    MembershipRequest
} from '@feuertiger/web-components';
import { useMembershipRequestQuery } from '@feuertiger/schema-graphql';
import { useRouter } from 'next/router';

const MembershipRequestPage = dynamic(
    async () => () => {
        const {
            query: { id }
        } = useRouter();

        const { data, error } = id
            ? useMembershipRequestQuery({
                  variables: { id: id as string }
              })
            : { data: null, error: null };

        return (
            <LoadingContainer loading={!data} error={error}>
                <MembershipRequest
                    membershipRequest={data?.membershipRequest}
                    cancelRequest={null}
                />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default MembershipRequestPage;
