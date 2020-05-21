/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import { Member, MemberProps } from '@feuertiger/web-components';

const MemberPage = (props: MemberProps) => <Member {...props} />;

export default graphql(gql`
    {
        allPersons {
            id
            firstname
            lastname
        }
    }
`)(MemberPage);
