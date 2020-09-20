import React, { ReactElement } from 'react';
import { Grid, Breadcrumbs, Typography, Fab } from '@material-ui/core';
import MaterialTable from 'material-table';
import FindInPage from '@material-ui/icons/FindInPage';
import { AllExercisesQueryResult } from '@feuertiger/schema-graphql';

import { Link } from '../index';

export type ExerciseTableProps = AllExercisesQueryResult;

export const ExerciseTable = ({
    data: { allExercises }
}: ExerciseTableProps): ReactElement => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/exercices">Übungen</Link>
                <Typography color="textPrimary">Übersicht</Typography>
            </Breadcrumbs>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
            <MaterialTable
                options={{
                    exportButton: true,
                    filtering: true,
                    grouping: true,
                    search: true,
                    sorting: true
                }}
                columns={[
                    { title: 'Thema', field: 'topic' },
                    {
                        title: 'Datum',
                        field: 'timeslot.start',
                        type: 'date'
                    },
                    {
                        title: 'Anfang',
                        field: 'timeslot.start',
                        type: 'time'
                    },
                    {
                        title: 'Ende',
                        field: 'timeslot.end',
                        type: 'time'
                    },
                    {
                        title: '',
                        field: 'edit',
                        filtering: false,
                        render: ({ id }) => (
                            <Link
                                href="/exercices/[id]"
                                as={`/exercices/${id}`}
                            >
                                <Fab color="primary" aria-label="edit">
                                    <FindInPage />
                                </Fab>
                            </Link>
                        )
                    }
                ]}
                data={allExercises}
                title="Übungen"
            />
        </Grid>
    </Grid>
);
