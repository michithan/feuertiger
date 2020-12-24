import React from 'react';
import dynamic from 'next/dynamic';
import { MemberTable, LoadingContainer } from '@feuertiger/web-components';
import {
    useDepartmentMembershipsQuery,
    DepartmentMembershipsQuery,
    DepartmentMembershipsQueryVariables
} from '@feuertiger/schema-graphql';
import { createMaterialTableFetchFunction } from '@feuertiger/pagination';
import { useRouter } from 'next/router';

const Member = dynamic(
    async () => () => {
        const {
            query: { id }
        } = useRouter();
        const queryResult = useDepartmentMembershipsQuery({
            variables: {
                id: id as string,
                query: {
                    page: 0,
                    pageSize: 5
                }
            }
        });
        const { loading, error } = queryResult;
        return (
            <LoadingContainer loading={loading} error={error}>
                <MemberTable
                    fetchDepartmentMembers={createMaterialTableFetchFunction<
                        DepartmentMembershipsQuery,
                        DepartmentMembershipsQuery['department']['memberships']['edges'][0]['node'],
                        DepartmentMembershipsQueryVariables
                    >(
                        queryResult,
                        ({
                            data: {
                                department: { memberships }
                            }
                        }) => memberships
                    )}
                />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);

export default Member;
