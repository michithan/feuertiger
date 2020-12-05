import React, { ReactElement } from 'react';
import { Paper } from '..';

export interface DepartmentRegisterPageProps {
    fetchKnownDepartments: null;
    registerDepartmentMutation: null;
}

export const DepartmentRegisterPage = (): ReactElement => (
    <Paper>Hello Register</Paper>
);
