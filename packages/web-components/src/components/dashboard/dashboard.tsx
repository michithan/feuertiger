import React from 'react';
import { Grid, Breadcrumbs, Typography } from '@material-ui/core';
import { DashboardQueryResult } from '@feuertiger/schema-graphql';

import { Paper, Link, PieChart } from '../../index';

interface State {}

export interface DashboardProps extends DashboardQueryResult {}

export class Dashboard extends React.Component<DashboardProps, State> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            data: {
                dashboard: { countMembersByGrade, countExerciseByCategory }
            }
        } = this.props;
        return (
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
                                <Link href="/exercices" inherit>
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
    }
}
