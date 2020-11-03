import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import {
    MemberTable,
    MemberTableProps,
    LoadingContainer
} from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';

const Member = dynamic(
    async () => () => {
        const query = useQuery(AllPersonsDocument);
        const { loading, error } = query;
        const copy: MemberTableProps = {
            fetchPersons: createMaterialTableFetchFunction(query)
        };
        return (
            <LoadingContainer loading={loading} error={error}>
                <MemberTable {...copy} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Member;
