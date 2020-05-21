/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { Member } from '@feuertiger/web-components';
import { AllPersonsDocument } from '@feuertiger/schema-graphql';

const MemberPage = graphql(AllPersonsDocument)(Member);

export default () => <MemberPage />;
