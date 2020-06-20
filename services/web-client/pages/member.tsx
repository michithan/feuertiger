import React from 'react';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';

import { MemberTable, MemberTableProps } from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';

export default dynamic(
    async () => () => {
        const props = useQuery(AllPersonsDocument);
        const memberProps: MemberTableProps = {
            ...props,
            data: {
                allPersons: props?.data?.allPersons?.map((person) => ({
                    ...person
                }))
            }
        };
        return <MemberTable {...memberProps} />;
    },
    {
        ssr: false
    }
);
