import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
    DepartmentsQuery,
    DepartmentsQueryVariables,
    useDepartmentsQuery,
    useEntrypointQuery,
    CreateMembershipRequestDocument
} from '@feuertiger/schema-graphql';
import { EntrypointPage, LoadingContainer } from '@feuertiger/web-components';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';
import { useMutation } from '@apollo/client';

const Index = dynamic(
    async () => () => {
        const {
            loading,
            data: { viewer: { openMembershipRequest, person } = {} } = {}
        } = useEntrypointQuery();
        const router = useRouter();

        const departmentId = person?.mainDepartmentMembership?.department?.id;
        const membershipRequestId = openMembershipRequest?.id;

        if (departmentId) {
            router.push(`/department/${departmentId}`);
        } else if (membershipRequestId) {
            router.push(`/membership-request/${membershipRequestId}`);
        } else if (!loading) {
            const queryResult = useDepartmentsQuery({
                variables: {
                    query: {
                        page: 0,
                        pageSize: 10
                    }
                },
                fetchPolicy: 'standby'
            });
            const fetchDepartments = createMaterialTableFetchFunction<
                DepartmentsQuery,
                DepartmentsQuery['departments']['edges'][0]['node'],
                DepartmentsQueryVariables
            >(queryResult, ({ data: { departments } }) => departments);
            const [createMembershipRequest] = useMutation(
                CreateMembershipRequestDocument
            );
            return (
                <EntrypointPage
                    firstname={person?.firstname}
                    fetchDepartments={fetchDepartments}
                    createMembershipRequest={createMembershipRequest}
                />
            );
        }

        return (
            <LoadingContainer loading={loading}>
                <></>
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Index;
