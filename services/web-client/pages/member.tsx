/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useQuery } from '@apollo/client';

import { Member } from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';

// export default graphql(AllPersonsDocument)(Member);

export default () => {
    const props = useQuery(AllPersonsDocument);
    console.log('props: ', props);
    // return null;
    return <Member {...props} />;
};
