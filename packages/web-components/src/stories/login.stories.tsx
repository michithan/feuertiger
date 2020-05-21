/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Login, LoginProps } from '../components/login/login';
import auth from '../types/authProps.mock';

const defaultProps: LoginProps = {
    ...auth
};

storiesOf('Login', module).add('Default', () => {
    const props: LoginProps = {
        ...defaultProps
    };
    return <Login {...props} />;
});
