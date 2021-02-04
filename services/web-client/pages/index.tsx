import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
    DepartmentsQuery,
    DepartmentsQueryVariables,
    useDepartmentsQuery,
    useEntrypointQuery
} from '@feuertiger/schema-graphql';
import { EntrypointPage, LoadingContainer } from '@feuertiger/web-components';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';

const checkViewer = ({ data }, router) => {
    if (!data) {
        return <LoadingContainer loading>{null}</LoadingContainer>;
    }

    const viewer = data?.viewer;
    const departmentId =
        viewer?.person?.mainDepartmentMembership?.department?.id;

    if (departmentId) {
        router.push(`/department/${departmentId}`);
    }

    return viewer;
};

const Index = dynamic(
    async () => () => {
        const entrypointQueryResult = useEntrypointQuery();
        const router = useRouter();

        const viewer = checkViewer(entrypointQueryResult, router);

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

        return (
            <EntrypointPage
                firstname={viewer?.person?.firstname}
                fetchDepartments={fetchDepartments}
                fetchDepartmentMembers={null}
                joinDepartmentMutation={null}
            />
        );
    },
    {
        ssr: false
    }
);

export default Index;
