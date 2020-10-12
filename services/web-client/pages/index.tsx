import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import { DashboardDocument } from '@feuertiger/schema-graphql';
import { Dashboard, LoadingContainer } from '@feuertiger/web-components';

const Index = dynamic(
    async () => () => {
        const dashboardProps = useQuery(DashboardDocument);
        return (
            <LoadingContainer loading={dashboardProps.loading}>
                <Dashboard {...dashboardProps} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Index;
