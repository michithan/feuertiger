import { MaterialTableFetchFunction } from '@feuertiger/pagination';
import { DepartmentsQueryResult } from '@feuertiger/schema-graphql';
import { Box } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { ReactElement } from 'react';
import { Paper } from '..';

export interface DepartmentJoinPageProps {
    fetchDepartments: MaterialTableFetchFunction<
        DepartmentsQueryResult['data']['departments']['edges'][0]['node']
    >;
    fetchDepartmentMembers: null;
    joinDepartmentMutation: null;
}

// Step 1 chose department

// Step 2 chose person or create person

// Step 3 chose confirm

// Step 4 wait for confirmation

export const DepartmentJoinPage = ({
    fetchDepartments
}: // fetchDepartmentMembers,
// joinDepartmentMutation
DepartmentJoinPageProps): ReactElement => (
    <Paper>
        <MaterialTable
            title="Welcher Feuerwehr willst du beitreten?"
            components={{
                Container: Box
            }}
            options={{
                search: true,
                sorting: true
            }}
            columns={[{ title: 'Name', field: 'name' }]}
            data={fetchDepartments}
        />
    </Paper>
);
