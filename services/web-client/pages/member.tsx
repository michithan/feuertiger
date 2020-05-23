/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';

// import { Member } from '@feuertiger/web-components';
// import { AllPersonsDocument } from '@feuertiger/schema-graphql';

// export default graphql(AllPersonsDocument)(Member);

const MemberPage = graphql(gql`
    {
        allPersons {
            id
            firstname
            lastname
        }
    }
`)((props) => {
    console.log('props: ', props);
    return null;
});

export default (props, ...rest) => {
    console.log('props: ', props);
    console.log('rest: ', rest);
    return <MemberPage {...props} />;
};
