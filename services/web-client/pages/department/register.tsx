import { DepartmentRegisterPage } from '@feuertiger/web-components';
import dynamic from 'next/dynamic';
import React from 'react';

const Register = dynamic(async () => () => <DepartmentRegisterPage />, {
    ssr: false
});

export default Register;
