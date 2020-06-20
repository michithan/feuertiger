import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import { DashboardDocument } from '@feuertiger/schema-graphql';
import { Dashboard, DashboardProps } from '@feuertiger/web-components';

export default dynamic(
    async () => () => {
        const props = useQuery(DashboardDocument);
        const dashboardProps: DashboardProps = {
            ...props,
            data: {
                member: props?.data?.member?.map((member) => ({
                    ...member
                }))
            }
        };
        return <Dashboard {...dashboardProps} />;
    },
    {
        ssr: false
    }
);
