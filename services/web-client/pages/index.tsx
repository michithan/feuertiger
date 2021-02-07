import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
    DepartmentsQuery,
    DepartmentsQueryVariables,
    useDepartmentsQuery,
    useEntrypointQuery,
    useCreateMembershipRequestMutation
} from '@feuertiger/schema-graphql';
import { EntrypointPage, LoadingContainer } from '@feuertiger/web-components';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';

const Index = dynamic(
    async () => () => {
        const {
            loading,
            data: { viewer: { openMembershipRequest, person } = {} } = {}
        } = useEntrypointQuery({
            fetchPolicy: 'network-only'
        });
        const { push } = useRouter();

        const departmentId = person?.mainDepartmentMembership?.department?.id;
        const membershipRequestId = openMembershipRequest?.id;

        if (departmentId) {
            push(`/department/${departmentId}`);
        } else if (membershipRequestId) {
            push(`/membership-request/${membershipRequestId}`);
        }

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

        const [createMembershipRequest] = useCreateMembershipRequestMutation();
        const requestMembership = async (selectedDepartmentId: string) => {
            const {
                data: {
                    createMembershipRequest: { id }
                }
            } = await createMembershipRequest({
                variables: {
                    membershipRequest: {
                        departmentId: selectedDepartmentId
                    }
                }
            });

            const success = Boolean(id);

            if (success) {
                setTimeout(() => push(`/membership-request/${id}`), 1000);
            }

            return success;
        };

        return (
            <LoadingContainer
                loading={
                    loading ||
                    Boolean(departmentId) ||
                    Boolean(membershipRequestId)
                }
            >
                <EntrypointPage
                    firstname={person?.firstname}
                    fetchDepartments={fetchDepartments}
                    requestMembership={requestMembership}
                />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Index;
