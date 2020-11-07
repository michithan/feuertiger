import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import {
    MemberTable,
    MemberTableProps,
    LoadingContainer
} from '@feuertiger/web-components';
import {
    AllPersonsQuery,
    AllPersonsQueryVariables,
    AllPersonsDocument
} from '@feuertiger/schema-graphql';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';

const Member = dynamic(
    async () => () => {
        const query = useQuery<AllPersonsQuery, AllPersonsQueryVariables>(
            AllPersonsDocument,
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
                AllPersonsQuery,
                AllPersonsQuery['allPersons']['edges'][0]['node'],
                AllPersonsQueryVariables
            >(query, ({ data: { allPersons } }) =>
                allPersons.edges.map(({ node }) => node)
            )
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
