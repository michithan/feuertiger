import React, { ReactElement } from 'react';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import { MaterialTableFetchFunction } from '@feuertiger/pagination';
import { DepartmentsQueryResult } from '@feuertiger/schema-graphql';

import { Link, Paper } from '..';

type Department = DepartmentsQueryResult['data']['departments']['edges'][0]['node'];

export interface EntrypointPageProps {
    firstname: string;
    fetchDepartments: MaterialTableFetchFunction<Department>;
    requestMembership: (departmentId: string) => Promise<boolean>;
}

export const EntrypointPage = ({
    firstname,
    fetchDepartments,
    requestMembership
}: EntrypointPageProps): ReactElement => {
    const { enqueueSnackbar } = useSnackbar();
    const SubmitJoinDepartmentRequest = async ({
        id
    }: Department): Promise<void> => {
        const success = await requestMembership(id);
        enqueueSnackbar(
            success
                ? 'Beitritt beantragt'
                : 'Beitritt-Beantragung fehlgeschlagen',
            {
                variant: success ? 'success' : 'error'
            }
        );
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="subtitle1">
                        {firstname ? `Hallo ${firstname}` : 'Hallo'}
                    </Typography>
                    <Typography variant="body1">
                        Du bist noch zu keiner Feuerwehr zugewiesen.
                        Beitrittsantrag stellen.
                    </Typography>
                    <Typography variant="body1">
                        Hier kannst du nach deiner Feuerwehr suchen und einen
                        Beitrittsantrag stellen.
                    </Typography>
                </Paper>
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
                            sorting: true,
                            pageSize: 10
                        }}
                        columns={[
                            {
                                title: 'Name',
                                field: 'name',
                                render: ({ name, homepage }) =>
                                    homepage ? (
                                        <Link
                                            href={
                                                homepage.startsWith('http')
                                                    ? homepage
                                                    : `http://${homepage}`
                                            }
                                        >
                                            {name}
                                        </Link>
                                    ) : (
                                        name
                                    )
                            },
                            { title: 'Bereich', field: 'federation' },
                            { title: 'Ort', field: 'address.city' },
                            {
                                title: '',
                                field: 'requestJoin',
                                filtering: false,
                                render: department => (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() =>
                                            SubmitJoinDepartmentRequest(
                                                department
                                            )
                                        }
                                    >
                                        Beitreten
                                    </Button>
                                )
                            }
                        ]}
                        data={fetchDepartments}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};
