import React from 'react';
import dynamic from 'next/dynamic';
import { AdminDashboard, LoadingContainer } from '@feuertiger/web-components';
import {
    useAdminQuery,
    useResolveMembershipRequestMutation
} from '@feuertiger/schema-graphql';

const AdminPage = dynamic(
    async () => () => {
        const { loading, data } = useAdminQuery();

        const [
            resolveMembershipRequestMutation
        ] = useResolveMembershipRequestMutation();

        const resolveMembershipRequest = async (
            membershipRequestId: string
        ): Promise<boolean> => {
            const {
                data: {
                    admin: { resolveMembershipRequest: success }
                }
            } = await resolveMembershipRequestMutation({
                variables: {
                    membershipRequestId
                }
            });

            return success;
        };

        return (
            <LoadingContainer loading={loading}>
                <AdminDashboard
                    adminData={data?.admin}
                    resolveMembershipRequest={resolveMembershipRequest}
                />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default AdminPage;
