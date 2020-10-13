import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import {
    MemberTable,
    MemberTableProps,
    LoadingContainer
} from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';

const Member = dynamic(
    async () => () => {
        const { loading, error, data } = useQuery(AllPersonsDocument);
        const copy: MemberTableProps = {
            allPersons: data?.allPersons?.map(person => ({
                ...person
            }))
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
