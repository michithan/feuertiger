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
            query: { departmentId }
        } = useRouter();
        const queryResult = useDepartmentMembershipsQuery({
            variables: {
                id: departmentId as string,
                query: {
                    page: 0,
                    pageSize: 5
                }
            },
            fetchPolicy: departmentId ? 'cache-and-network' : 'standby'
        });
        const { loading, error } = queryResult;

        const linkToMember = (
            member: DepartmentMembershipsQuery['department']['memberships']['edges'][0]['node']['person']
        ) => ({
            href: '/department/[departmentId]/member/[memberId]',
            as: `/department/${departmentId}/member/${member.id}`
        });

        return (
            <LoadingContainer loading={loading} error={error}>
                <MemberTable
                    linkToMember={linkToMember}
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
