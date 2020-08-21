import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Login, LoginProps, authPropsMock } from '../index';

const defaultProps: LoginProps = {
    ...authPropsMock
};

storiesOf('Login', module).add('Default', () => {
    const props: LoginProps = {
        ...defaultProps
    };
    return <Login {...props} />;
});
