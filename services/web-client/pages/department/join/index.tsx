import {
    DepartmentJoinPage,
    LoadingContainer
} from '@feuertiger/web-components';
import dynamic from 'next/dynamic';
import React from 'react';
import {
    useDepartmentsQuery,
    DepartmentsQuery,
    DepartmentsQueryVariables
} from '@feuertiger/schema-graphql';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';

const Join = dynamic(
    async () => () => {
        const queryResult = useDepartmentsQuery({
            variables: {
                query: {
                    page: 0,
                    pageSize: 5
                }
            }
        });
        const { loading, error } = queryResult;
        const fetchDepartments = createMaterialTableFetchFunction<
            DepartmentsQuery,
            DepartmentsQuery['departments']['edges'][0]['node'],
            DepartmentsQueryVariables
        >(queryResult, ({ data: { departments } }) => departments);
        return (
            <LoadingContainer loading={loading} error={error}>
                <DepartmentJoinPage
                    fetchDepartments={fetchDepartments}
                    fetchDepartmentMembers={null}
                    joinDepartmentMutation={null}
                />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Join;
