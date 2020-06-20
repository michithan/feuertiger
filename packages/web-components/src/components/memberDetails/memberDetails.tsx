import React from 'react';
import { Grid, Typography, Breadcrumbs } from '@material-ui/core';
import {
    PersonDetailsQueryResult,
    UpdatePersonMutationFn
} from '@feuertiger/schema-graphql';

import { Link, MemberBasicDetails } from '../index';
import { MemberExercisesDetails } from './memberExercisesDetails';
import { MemberPromotionsDetail } from './memberPromotionsDetail';

export interface MemberDetailsProps {
    member: PersonDetailsQueryResult['data']['node'];
    updatePerson: UpdatePersonMutationFn;
}

interface State {}

export class MemberDetails extends React.Component<MemberDetailsProps, State> {
    constructor(props: MemberDetailsProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { member, updatePerson } = this.props;
        const {
            id,
            firstname,
            lastname,
            promotions,
            exercisesParticipated
        } = member;
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
                    <MemberBasicDetails
                        member={member}
                        updatePerson={updatePerson}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MemberExercisesDetails
                        exercisesParticipated={exercisesParticipated}
                    />
                </Grid>
                <Grid item container spacing={3} xs={6}>
                    <Grid item xs={12}>
                        <MemberPromotionsDetail promotions={promotions} />
                    </Grid>
                    <Grid item xs={12}>
                        <MemberPromotionsDetail promotions={promotions} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
