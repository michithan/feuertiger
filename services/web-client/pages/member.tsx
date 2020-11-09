import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import {
    MemberTable,
    MemberTableProps,
    LoadingContainer
} from '@feuertiger/web-components';
import {
    PersonsQuery,
    PersonsQueryVariables,
    PersonsDocument
} from '@feuertiger/schema-graphql';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';

const Member = dynamic(
    async () => () => {
        const query = useQuery<PersonsQuery, PersonsQueryVariables>(
            PersonsDocument,
            {
                variables: {
                    query: {
                        page: 0,
                        pageSize: 5
                    }
                }
            }
        );
        const { loading, error } = query;
        const copy: MemberTableProps = {
            fetchPersons: createMaterialTableFetchFunction<
                PersonsQuery,
                PersonsQuery['persons']['edges'][0]['node'],
                PersonsQueryVariables
            >(query, ({ data: { persons } }) => persons)
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
