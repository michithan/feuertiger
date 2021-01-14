import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import { DashboardDocument } from '@feuertiger/schema-graphql';
import { Dashboard, LoadingContainer } from '@feuertiger/web-components';
// import { useRouter } from 'next/router';

const Index = dynamic(
    async () => () => {
        // const {
        //     query: { id }
        // } = useRouter();
        const { loading, error, data } = useQuery(DashboardDocument);
        return (
            <LoadingContainer loading={loading} error={error}>
                <Dashboard {...data} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Index;
