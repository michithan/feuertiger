/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { MemberDetailsProps, MemberDetails } from '@feuertiger/web-components';
import {
    PersonDetailsDocument,
    PersonDetailsQueryResult,
    Person
} from '@feuertiger/schema-graphql';

export default () => {
    const router = useRouter();
    const { id } = router.query;
    const props = useQuery(PersonDetailsDocument, {
        variables: { id }
    }) as PersonDetailsQueryResult;
    const memberDetailsProps: MemberDetailsProps = {
        ...props,
        member: props?.data?.node as Person
    };
    return <MemberDetails {...memberDetailsProps} />;
};
