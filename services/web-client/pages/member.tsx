import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import {
    MemberTable,
    MemberTableProps,
    LoadingContainer
} from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';

export default dynamic(
    async () => () => {
        const props = useQuery(AllPersonsDocument);
        const memberProps: MemberTableProps = {
            ...props,
            data: {
                allPersons: props?.data?.allPersons?.map(person => ({
                    ...person
                }))
            }
        };
        return (
            <LoadingContainer loading={props.loading}>
                <MemberTable {...memberProps} />
            </LoadingContainer>
        );
    },
    {
        ssr: false
    }
);
