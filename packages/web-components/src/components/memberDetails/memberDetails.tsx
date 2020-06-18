import React, { ReactElement } from 'react';
import { Grid, Avatar, Typography, Divider } from '@material-ui/core';
import { Person, PersonDetailsQueryResult } from '@feuertiger/schema-graphql';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { Paper } from '../paper/paper';

export interface MemberDetailsProps extends PersonDetailsQueryResult {
    member: Partial<Person> | undefined | null;
}

interface State {}

const StyledAvatar = styled(Avatar)`
    height: ${({ theme }) => theme.spacing(14)}px !important;
    width: ${({ theme }) => theme.spacing(14)}px !important;
`;

export interface DetailProps {
    label: string | number | ReactElement;
    children: string | number | ReactElement | ReactElement[];
}

const Detail = ({ label, children }: DetailProps) => (
    <Grid item xs={12} sm={6} container spacing={3}>
        <Grid item xs={6}>
            <Typography variant="caption">{label}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="body1">{children}</Typography>
        </Grid>
    </Grid>
);

export class MemberDetails extends React.Component<MemberDetailsProps, State> {
    constructor(props: MemberDetailsProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { member, loading } = this.props;

        if (loading && !member) {
            return (
                <Paper>
                    <>
                        <Skeleton height={40} />
                        <Skeleton variant="rect" height={190} />
                        <Skeleton height={40} />
                        <Skeleton variant="rect" height={190} />
                        <Skeleton height={40} />
                        <Skeleton variant="rect" height={190} />
                        <Skeleton height={40} />
                        <Skeleton variant="rect" height={190} />
                    </>
                </Paper>
            );
        }

        const {
            firstname,
            lastname,
            avatar,
            dateOfBirth,
            grade,
            address,
            exercisesParticipated,
            exercisesLeaded,
            promotions,
            memberships,
            placeOfBirth,
            birthName
        } = member || {};
        const { entryDate, active } = (memberships && memberships[0]) || {};
        const { postalCode, city, street, streetNumber } = address || {};

        return (
            <Paper>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} container spacing={3} justify="center">
                        <Grid
                            item
                            xs={6}
                            justify="center"
                            alignContent="center"
                            container
                        >
                            <Typography variant="h3" component="h3">
                                {firstname} {lastname}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            justify="center"
                            alignContent="center"
                            container
                        >
                            <StyledAvatar alt="Profilbild" src={avatar} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container spacing={3} justify="center">
                        <Divider style={{ width: '100%' }} />
                    </Grid>
                    <Detail label="Geburtsdatum">{dateOfBirth}</Detail>
                    <Detail label="Adresse">
                        <>
                            {postalCode} {city}
                            <br />
                            {street} {streetNumber}
                        </>
                    </Detail>
                    <Detail label="Geburtsort">{placeOfBirth}</Detail>
                    <Detail label="Geburtsname">{birthName}</Detail>
                    <Grid item xs={12} container spacing={3} justify="center">
                        <Divider style={{ width: '100%' }} />
                    </Grid>
                    <Detail label="Eintrittsdatum">{entryDate}</Detail>
                    <Detail label="Status">
                        {active ? 'Aktiv' : 'Inaktiv'}
                    </Detail>
                    <Detail label="Dienstgrad">{grade}</Detail>
                    <Detail label="Beförderungen">{promotions?.length}</Detail>
                    <Detail label="Übungen teilgenommen">
                        {exercisesParticipated?.length}
                    </Detail>
                    <Detail label="Übungen geleitet">
                        {exercisesLeaded?.length}
                    </Detail>
                </Grid>
            </Paper>
        );
    }
}
