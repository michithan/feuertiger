import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEntrypointQuery } from '@feuertiger/schema-graphql';
import { EntrypointPage, LoadingContainer } from '@feuertiger/web-components';

const Index = dynamic(
    async () => () => {
        const { data, loading } = useEntrypointQuery();
        const router = useRouter();

        if (loading) {
            return <LoadingContainer loading>{null}</LoadingContainer>;
        }

        const viewer = data?.viewer;
        const departmentId =
            viewer?.person?.mainDepartmentMembership?.department?.id;

        if (departmentId) {
            router.push(`/department/${departmentId}`);
        }

        return (
            <LoadingContainer loading={false}>
                <EntrypointPage firstname={viewer?.person?.firstname} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Index;
