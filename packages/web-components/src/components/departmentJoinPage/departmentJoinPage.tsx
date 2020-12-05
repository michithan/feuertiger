import React, { ReactElement } from 'react';
import { Paper } from '..';

export interface DepartmentJoinPageProps {
    fetchDepartments: null;
    fetchDepartmentMembers: null;
    joinDepartmentMutation: null;
}

// Step 1 chose department

// Step 2 chose person or create person

// Step 3 chose confirm

// Step 4 wait for confirmation

export const DepartmentJoinPage = (): ReactElement => <Paper>Hello Join</Paper>;
