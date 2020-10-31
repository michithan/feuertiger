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
        const { loading, error, refetch, data } = useQuery(AllPersonsDocument);

        const copy: MemberTableProps = {
            fetchPersons: async query => {
                await refetch({
                    filters: query.filters,
                    page: query.page,
                    pageSize: query.pageSize,
                    totalCount: query.totalCount,
                    search: query.search,
                    orderBy: query.orderBy.field.name,
                    orderDirection: query.orderDirection
                });
                return {
                    data,
                    page: result.page - 1,
                    totalCount: data.allPersons.length
                };
            }
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
