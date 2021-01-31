import React, { ReactElement } from 'react';
import { Grid, Box } from '@material-ui/core';
import MaterialTable from 'material-table';
import { MaterialTableFetchFunction } from '@feuertiger/pagination';
import { DepartmentsQueryResult } from '@feuertiger/schema-graphql';

import { Paper } from '..';

export interface EntrypointPageProps {
    firstname: string;
    fetchDepartments: MaterialTableFetchFunction<
        DepartmentsQueryResult['data']['departments']['edges'][0]['node']
    >;
    fetchDepartmentMembers: null;
    joinDepartmentMutation: null;
}

export const EntrypointPage = ({
    firstname,
    fetchDepartments
}: EntrypointPageProps): ReactElement => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>{firstname ? `Hallo ${firstname}` : 'Hallo'}</Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <MaterialTable
                        title="Welche ist deine Feuerwehr?"
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
            </Grid>
        </Grid>
    );
};
