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
        const {
            address,
            memberships,
            exercisesParticipated,
            exercisesLeaded,
            promotions
        } = member || {};
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
            exercisesParticipated: exercisesParticipated?.length,
            exercisesLeaded: exercisesLeaded?.length,
            promotions: promotions?.length,
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
            handleSubmit
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
            streetNumber,
            exercisesParticipated,
            exercisesLeaded,
            promotions
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
                                                            onBlur={handleBlur}
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
                                                            onBlur={handleBlur}
                                                            onReset={
                                                                handleReset
                                                            }
                                                            label="Ort"
                                                            id="cityInput"
                                                            name="cityInput"
                                                            defaultValue={city}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
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
                                                            onBlur={handleBlur}
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
                                        <GridDivider />
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
                                        <Detail
                                            label="Beförderungen"
                                            edit={editMode}
                                            name="promotions"
                                            type={DetailType.Button}
                                        >
                                            {promotions}
                                        </Detail>
                                        <Detail
                                            label="Übungen teilgenommen"
                                            edit={editMode}
                                            name="exercisesParticipated"
                                            type={DetailType.Button}
                                        >
                                            {exercisesParticipated}
                                        </Detail>
                                        <Detail
                                            label="Übungen geleitet"
                                            edit={editMode}
                                            name="exercisesLeaded"
                                            type={DetailType.Button}
                                        >
                                            {exercisesLeaded}
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

export const MemberDetails = withFormik<MemberDetailsProps, FormValues>(
    formConfig
)(MemberDetailsWithForm);
