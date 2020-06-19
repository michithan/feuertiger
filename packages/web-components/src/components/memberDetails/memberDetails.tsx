import React from 'react';
import {
    Grid,
    Avatar,
    Typography,
    Divider,
    Breadcrumbs
} from '@material-ui/core';
import { Person, PersonDetailsQueryResult } from '@feuertiger/schema-graphql';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

import { Link, Paper, Detail, EditButtonGroup, DetailType } from '../index';

export interface MemberDetailsProps extends PersonDetailsQueryResult {
    member: Partial<Person> | undefined | null;
}

const StyledAvatar = styled(Avatar)`
    height: ${({ theme }) => theme.spacing(14)}px !important;
    width: ${({ theme }) => theme.spacing(14)}px !important;
`;

interface State {
    editMode: boolean;
}

const GridDivider = () => (
    <Grid item xs={12} container spacing={3} justify="center">
        <Divider style={{ width: '100%' }} />
    </Grid>
);

export class MemberDetails extends React.Component<MemberDetailsProps, State> {
    constructor(props: MemberDetailsProps) {
        super(props);
        this.state = { editMode: false };
    }

    handleClickEdit = () => this.setState({ editMode: true });

    handleClickDiscard = () => this.setState({ editMode: true });

    handleClickBack = () => this.setState({ editMode: false });

    handleClickSave = () => this.setState({ editMode: false });

    render() {
        const { member, loading } = this.props;
        const { editMode } = this.state;
        const {
            id,
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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/member">Mitglieder</Link>
                        <Link
                            href={id ? '/member/[id]' : '/member'}
                            as={id ? `/member/${id}` : '/member'}
                        >
                            {firstname || '...'}
                        </Link>
                        <Typography color="textPrimary">Details</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <form>
                            <Grid container spacing={3} justify="center">
                                {loading ? (
                                    <>
                                        <Skeleton height={40} />
                                        <Skeleton variant="rect" height={190} />
                                    </>
                                ) : (
                                    <>
                                        <Grid
                                            item
                                            xs={12}
                                            container
                                            spacing={3}
                                            justify="center"
                                        >
                                            <Grid
                                                item
                                                xs={5}
                                                justify="center"
                                                alignContent="center"
                                                container
                                            >
                                                <Typography
                                                    variant="h3"
                                                    component="h3"
                                                >
                                                    {firstname} {lastname}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                                justify="center"
                                                alignContent="center"
                                                container
                                            >
                                                <StyledAvatar
                                                    alt="Profilbild"
                                                    src={avatar}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={3}
                                                container
                                                justify="flex-end"
                                                alignContent="flex-start"
                                            >
                                                <EditButtonGroup
                                                    editMode={editMode}
                                                    handleClickSave={
                                                        this.handleClickSave
                                                    }
                                                    handleClickDiscard={
                                                        this.handleClickDiscard
                                                    }
                                                    handleClickBack={
                                                        this.handleClickBack
                                                    }
                                                    handleClickEdit={
                                                        this.handleClickEdit
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                        <GridDivider />
                                        <Detail
                                            label="Geburtsdatum"
                                            edit={editMode}
                                            name="dateOfBirth"
                                            type={DetailType.Text}
                                        >
                                            {dateOfBirth}
                                        </Detail>
                                        <Detail
                                            label="Adresse"
                                            edit={editMode}
                                            name="adresse"
                                            type={DetailType.Text}
                                        >
                                            <>
                                                {postalCode} {city}
                                                <br />
                                                {street} {streetNumber}
                                            </>
                                        </Detail>
                                        <Detail
                                            label="Geburtsort"
                                            edit={editMode}
                                            name="placeOfBirth"
                                            type={DetailType.Text}
                                        >
                                            {placeOfBirth}
                                        </Detail>
                                        <Detail
                                            label="Geburtsname"
                                            edit={editMode}
                                            name="birthName"
                                            type={DetailType.Text}
                                        >
                                            {birthName}
                                        </Detail>
                                        <GridDivider />
                                        <Detail
                                            label="Eintrittsdatum"
                                            edit={editMode}
                                            name="entryDate"
                                            type={DetailType.Text}
                                        >
                                            {entryDate}
                                        </Detail>
                                        <Detail
                                            label="Status"
                                            edit={editMode}
                                            name="active"
                                            type={DetailType.Text}
                                        >
                                            {active ? 'Aktiv' : 'Inaktiv'}
                                        </Detail>
                                        <Detail
                                            label="Dienstgrad"
                                            edit={editMode}
                                            name="grade"
                                            type={DetailType.Text}
                                        >
                                            {grade}
                                        </Detail>
                                        <Detail
                                            label="Beförderungen"
                                            edit={editMode}
                                            name="promotions"
                                            type={DetailType.Text}
                                        >
                                            {promotions?.length}
                                        </Detail>
                                        <Detail
                                            label="Übungen teilgenommen"
                                            edit={editMode}
                                            name="exercisesParticipated"
                                            type={DetailType.Text}
                                        >
                                            {exercisesParticipated?.length}
                                        </Detail>
                                        <Detail
                                            label="Übungen geleitet"
                                            edit={editMode}
                                            name="exercisesLeaded"
                                            type={DetailType.Text}
                                        >
                                            {exercisesLeaded?.length}
                                        </Detail>
                                    </>
                                )}
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
