/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useQuery } from '@apollo/client';

import { MemberTable, MemberTableProps } from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';

export default () => {
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
};
