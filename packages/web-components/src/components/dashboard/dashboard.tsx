import { DashboardQueryResult } from '@feuertiger/schema-graphql';
import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link, Paper, PieChart } from '../../index';

export type DashboardProps = DashboardQueryResult['data'];

export const Dashboard = ({
    dashboard: { countMembersByGrade, countExerciseByCategory }
}: DashboardProps): ReactElement => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/">Dashboard</Link>
                <Typography color="textPrimary">Übersicht</Typography>
            </Breadcrumbs>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Paper>
                <Grid container spacing={3}>
                    <Grid container item xs={12} justify="center">
                        <Link href="/member" inherit>
                            <Typography variant="h4" component="h4">
                                Mitglieder
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        justify="center"
                        alignContent="center"
                    >
                        <PieChart data={countMembersByGrade} />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Paper>
                <Grid container spacing={3}>
                    <Grid container item xs={12} justify="center">
                        <Link href="/exercises" inherit>
                            <Typography variant="h4" component="h4">
                                Übungen
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        justify="center"
                        alignContent="center"
                    >
                        <PieChart data={countExerciseByCategory} />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
);
