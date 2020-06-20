import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import { DashboardDocument } from '@feuertiger/schema-graphql';
import { Dashboard } from '@feuertiger/web-components';

export default dynamic(
    async () => () => {
        const dashboardProps = useQuery(DashboardDocument);
        return <Dashboard {...dashboardProps} />;
    },
    {
        ssr: false
    }
);
