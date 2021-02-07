import React from 'react';
import dynamic from 'next/dynamic';
import { LoadingContainer } from '@feuertiger/web-components';

const AdminPage = dynamic(
    async () => () => {
        return (
            <LoadingContainer loading={false}>
                <p>Admin Page</p>
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default AdminPage;
