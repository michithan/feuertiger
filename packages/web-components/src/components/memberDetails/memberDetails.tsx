import React from 'react';
import { Grid, Typography, Breadcrumbs } from '@material-ui/core';
import {
    UpdatePersonMutationFn,
    UpdatePersonExercisesConnectionMutationFn,
    Person
} from '@feuertiger/schema-graphql';

import { Link, MemberBasicDetails } from '../index';
import { MemberExercisesDetails } from './memberExercisesDetails';
import { MemberPromotionsDetail } from './memberPromotionsDetail';

export interface MemberDetailsProps {
    member: Person;
    updatePerson: UpdatePersonMutationFn;
    updatePersonExercisesConnection: UpdatePersonExercisesConnectionMutationFn;
}

interface State {}

export class MemberDetails extends React.Component<MemberDetailsProps, State> {
    constructor(props: MemberDetailsProps) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            member,
            updatePerson,
            updatePersonExercisesConnection
        } = this.props;
        const {
            id,
            firstname,
            lastname,
            promotions,
            exercisesParticipated,
            exercisesNotParticipated
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
                        personId={id}
                        exercisesParticipated={exercisesParticipated}
                        exercisesNotParticipated={exercisesNotParticipated}
                        updatePersonExercisesConnection={
                            updatePersonExercisesConnection
                        }
                    />
                </Grid>
                <Grid item container xs={6}>
                    <MemberPromotionsDetail promotions={promotions} />
                </Grid>
                <Grid item xs={6} />
            </Grid>
        );
    }
}
