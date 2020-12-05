import { DepartmentJoinPage } from '@feuertiger/web-components';
import dynamic from 'next/dynamic';
import React from 'react';

const Join = dynamic(async () => () => <DepartmentJoinPage />, {
    ssr: false
});

export default Join;
