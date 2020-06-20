import React from 'react';
import { Grid, Breadcrumbs, Typography } from '@material-ui/core';
import { DashboardQueryResult } from '@feuertiger/schema-graphql';
import { PieChart, Pie } from 'recharts';

import { Paper, Link } from '../index';

interface State {}

export interface DashboardProps extends DashboardQueryResult {}

export class Dashboard extends React.Component<DashboardProps, State> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        const { dashboard } = data || {};
        const { membersByGrade, exerciseByCategory } = dashboard || {};
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
                                <Link href="/member">
                                    <Typography variant="h4" component="h4">
                                        Mitglieder
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid container item xs={12} justify="center">
                                <PieChart width={730} height={250}>
                                    <Pie
                                        data={membersByGrade}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={50}
                                        fill="#8884d8"
                                    />
                                </PieChart>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper>
                        <Grid container spacing={3}>
                            <Grid container item xs={12} justify="center">
                                <Link href="/exercices">
                                    <Typography variant="h4" component="h4">
                                        Übungen
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid container item xs={12} justify="center">
                                <PieChart width={730} height={250}>
                                    <Pie
                                        data={exerciseByCategory}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={50}
                                        fill="#8884d8"
                                    />
                                </PieChart>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
