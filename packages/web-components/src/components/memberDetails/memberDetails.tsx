import React, { ReactElement } from 'react';
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

export const MemberDetails = ({
    member,
    updatePerson,
    updatePersonExercisesConnection
}): ReactElement => {
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
            <Grid item sm={12} md={6}>
                <MemberExercisesDetails
                    personId={id}
                    exercisesParticipated={exercisesParticipated}
                    exercisesNotParticipated={exercisesNotParticipated}
                    updatePersonExercisesConnection={
                        updatePersonExercisesConnection
                    }
                />
            </Grid>
            <Grid item container sm={12} md={6}>
                <MemberPromotionsDetail promotions={promotions} />
            </Grid>
            <Grid item sm={false} md={6} />
        </Grid>
    );
};
