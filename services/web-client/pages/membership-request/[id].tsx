import React from 'react';
import dynamic from 'next/dynamic';
import {
    LoadingContainer,
    MembershipRequest
} from '@feuertiger/web-components';
import {
    useMembershipRequestQuery,
    useRemoveMembershipRequestMutation
} from '@feuertiger/schema-graphql';
import { useRouter } from 'next/router';

const MembershipRequestPage = dynamic(
    async () => () => {
        const {
            query: { id },
            push
        } = useRouter();

        const { data, error } = useMembershipRequestQuery({
            variables: { id: id as string },
            fetchPolicy: id ? 'cache-and-network' : 'standby'
        });

        const [removeMembershipRequest] = useRemoveMembershipRequestMutation();

        const cancelRequest = async (): Promise<boolean> => {
            const {
                data: { removeMembershipRequest: success }
            } = await removeMembershipRequest({
                variables: {
                    membershipRequestId: data?.membershipRequest?.id
                }
            });

            if (success) {
                setTimeout(() => push('/'), 1000);
            }

            return success;
        };

        if (data && data.membershipRequest == null) {
            push('/');
        }

        return (
            <LoadingContainer loading={!data?.membershipRequest} error={error}>
                <MembershipRequest
                    membershipRequest={data?.membershipRequest}
                    cancelRequest={cancelRequest}
                />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default MembershipRequestPage;
