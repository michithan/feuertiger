/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql, DataProps } from '@apollo/react-hoc';
import { Member } from '@feuertiger/web-components';
import {
    AllPersonsDocument,
    AllPersonsQueryResult
} from '@feuertiger/schema-graphql';

const MemberPage = (props: DataProps<AllPersonsQueryResult>) => (
    <Member {...props} />
);

export default graphql(AllPersonsDocument)(MemberPage);
