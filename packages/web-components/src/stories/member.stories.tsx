/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Member, MemberProps } from '../components/member/member';

const defaultProps: MemberProps = {
    data: null
};

storiesOf('Member', module).add('Default', () => {
    const props: MemberProps = {
        ...defaultProps
    };
    return <Member {...props} />;
});
