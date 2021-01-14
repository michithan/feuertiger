import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
    AddDepartment,
    AddDepartmentProps
} from '../components/addDepartment/addDepartment';

const defaultProps: AddDepartmentProps = {
    handleSubmit: data => {
        console.log('data: ', data);
    }
};

storiesOf('AddDepartment', module).add('Default', () => {
    const props: AddDepartmentProps = {
        ...defaultProps
    };
    return <AddDepartment {...props} />;
});
