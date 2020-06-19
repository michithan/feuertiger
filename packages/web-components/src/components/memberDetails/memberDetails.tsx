import React from 'react';
import {
    Grid,
    Avatar,
    Typography,
    Divider,
    Breadcrumbs,
    TextField
} from '@material-ui/core';
import {
    Person,
    PersonDetailsQueryResult,
    Grade
} from '@feuertiger/schema-graphql';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { withFormik, FormikProps } from 'formik';

import { Link, Paper, Detail, EditButtonGroup, DetailType } from '../index';
import { MemberExercisesDetails } from './memberExercisesDetails';
import { MemberExercisesLeadDetails } from './memberExercisesLeadDetails';
import { MemberPromotionsDetail } from './memberPromotionsDetail';

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

interface FormValues {
    id: string;
    firstname: string;
    lastname: string;
    avatar: string;
    dateOfBirth: string;
    grade: Grade;
    exercisesParticipated: number;
    exercisesLeaded: number;
    promotions: number;
    memberships: number;
    placeOfBirth: string;
    birthName: string;
    entryDate: string;
    active: boolean;
    postalCode: string;
    city: string;
    street: string;
    streetNumber: string;
}

const formConfig = {
    mapPropsToValues: ({ member }: MemberDetailsProps) => {
        const { address, memberships } = member || {};
        const { entryDate, active } = memberships?.[0] || {};
        const { postalCode, city, street, streetNumber } = address || {};
        return {
            ...member,
            entryDate,
            active,
            postalCode,
            city,
            street,
            streetNumber,
            memberships: memberships?.length
        };
    },
    enableReinitialize: true,
    validate: () => ({}),
    handleSubmit: () => {}
};

class MemberDetailsWithForm extends React.Component<
    MemberDetailsProps & FormikProps<FormValues>,
    State
> {
    constructor(props: MemberDetailsProps & FormikProps<FormValues>) {
        super(props);
        this.state = { editMode: false };
    }

    private handleClickEdit = () => this.setState({ editMode: true });

    private handleClickDiscard = () => {
        this.props?.resetForm();
        this.setState({ editMode: true });
    };

    private handleClickBack = () => {
        this.props?.resetForm();
        this.setState({ editMode: false });
    };

    private handleClickSave = () => this.setState({ editMode: false });

    render() {
        const {
            values,
            loading,
            dirty,
            handleChange,
            handleBlur,
            handleReset,
            handleSubmit,
            member
        } = this.props;
        const { editMode } = this.state;
        const {
            id,
            firstname,
            lastname,
            avatar,
            dateOfBirth,
            grade,
            placeOfBirth,
            birthName,
            entryDate,
            active,
            postalCode,
            city,
            street,
            streetNumber
        } = values;

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
                        <form onSubmit={handleSubmit}>
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
                                                    dirty={dirty}
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
                                        <Grid item xs={12} sm={6}>
                                            <Detail
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                handleReset={handleReset}
                                                label="Geburtsdatum"
                                                edit={editMode}
                                                name="dateOfBirth"
                                                type={DetailType.Date}
                                            >
                                                {dateOfBirth}
                                            </Detail>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Detail
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                handleReset={handleReset}
                                                label="Adresse"
                                                edit={editMode}
                                                name="adresse"
                                                type={DetailType.Component}
                                            >
                                                {editMode ? (
                                                    <Grid container>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                onReset={
                                                                    handleReset
                                                                }
                                                                label="PLZ"
                                                                id="postalCodeInput"
                                                                name="postalCodeInput"
                                                                defaultValue={
                                                                    postalCode
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                onReset={
                                                                    handleReset
                                                                }
                                                                label="Ort"
                                                                id="cityInput"
                                                                name="cityInput"
                                                                defaultValue={
                                                                    city
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                onReset={
                                                                    handleReset
                                                                }
                                                                label="Straße"
                                                                id="streetInput"
                                                                name="streetInput"
                                                                defaultValue={
                                                                    street
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                onReset={
                                                                    handleReset
                                                                }
                                                                label="Nummer"
                                                                id="streetNumberInput"
                                                                name="streetNumberInput"
                                                                defaultValue={
                                                                    streetNumber
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    <>
                                                        {postalCode} {city}
                                                        <br />
                                                        {street} {streetNumber}
                                                    </>
                                                )}
                                            </Detail>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Detail
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                handleReset={handleReset}
                                                label="Geburtsort"
                                                edit={editMode}
                                                name="placeOfBirth"
                                                type={DetailType.Text}
                                            >
                                                {placeOfBirth}
                                            </Detail>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Detail
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                handleReset={handleReset}
                                                label="Geburtsname"
                                                edit={editMode}
                                                name="birthName"
                                                type={DetailType.Text}
                                            >
                                                {birthName}
                                            </Detail>
                                        </Grid>
                                        <GridDivider />
                                        <Grid item xs={12} sm={6}>
                                            <Detail
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                handleReset={handleReset}
                                                label="Eintrittsdatum"
                                                edit={editMode}
                                                name="entryDate"
                                                type={DetailType.Date}
                                            >
                                                {entryDate}
                                            </Detail>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Detail
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                handleReset={handleReset}
                                                label="Status"
                                                edit={editMode}
                                                name="active"
                                                type={DetailType.Text}
                                            >
                                                {active ? 'Aktiv' : 'Inaktiv'}
                                            </Detail>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Detail
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                handleReset={handleReset}
                                                label="Dienstgrad"
                                                name="grade"
                                                type={DetailType.Text}
                                            >
                                                {grade}
                                            </Detail>
                                        </Grid>
                                        <Grid item xs={12} sm={6} />
                                    </>
                                )}
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <MemberExercisesDetails
                        editMode={editMode}
                        exercisesParticipated={member?.exercisesParticipated}
                    />
                </Grid>
                <Grid item container spacing={3} xs={6}>
                    <Grid item xs={12}>
                        <MemberPromotionsDetail
                            editMode={editMode}
                            promotions={member?.promotions}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MemberExercisesLeadDetails
                            editMode={editMode}
                            exercisesLeaded={member?.exercisesLeaded}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export const MemberDetails = withFormik<MemberDetailsProps, FormValues>(
    formConfig
)(MemberDetailsWithForm);
