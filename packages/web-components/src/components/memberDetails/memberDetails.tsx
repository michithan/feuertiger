import React from 'react';
import { Grid, Typography, Breadcrumbs } from '@material-ui/core';
import { Person, PersonDetailsQueryResult } from '@feuertiger/schema-graphql';

import Skeleton from '@material-ui/lab/Skeleton';
import { Link, MemberBasicDetails, Paper } from '../index';
import { MemberExercisesDetails } from './memberExercisesDetails';
import { MemberPromotionsDetail } from './memberPromotionsDetail';

export interface MemberDetailsProps extends PersonDetailsQueryResult {
    member: Partial<Person> | undefined | null;
}

interface State {}

export class MemberDetails extends React.Component<MemberDetailsProps, State> {
    constructor(props: MemberDetailsProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { loading, member } = this.props;
        if (loading || !member) {
            return (
                <Paper>
                    <Skeleton height={40} />
                    <Skeleton variant="rect" height={190} />
                </Paper>
            );
        }
        const { id, firstname, lastname } = member;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/member">Mitglieder</Link>
                        <Link href="/member/[id]" as={`/member/${id}`}>
                            {`${firstname} ${lastname}`}
                        </Link>
                        <Typography color="textPrimary">Details</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <MemberBasicDetails member={member} />
                </Grid>
                <Grid item xs={6}>
                    <MemberExercisesDetails
                        exercisesParticipated={member.exercisesParticipated}
                    />
                </Grid>
                <Grid item container spacing={3} xs={6}>
                    <Grid item xs={12}>
                        <MemberPromotionsDetail
                            promotions={member.promotions}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MemberPromotionsDetail
                            promotions={member.promotions}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
