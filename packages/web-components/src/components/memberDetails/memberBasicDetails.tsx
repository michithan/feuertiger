import React from 'react';
import { Grid, Avatar, Typography, Divider } from '@material-ui/core';
import {
    Person,
    UpdatePersonMutationFn,
    PersonUpdate
} from '@feuertiger/schema-graphql';
import styled from 'styled-components';
import { withFormik, FormikProps, Form, WithFormikConfig } from 'formik';

import {
    Paper,
    Detail,
    EditButtonGroup,
    DetailType,
    DetailAddress
} from '../index';

export interface MemberBasicDetailsProps {
    member: Person;
    updatePerson: UpdatePersonMutationFn;
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

const formConfig: WithFormikConfig<MemberBasicDetailsProps, PersonUpdate> = {
    mapPropsToValues: ({
        member: {
            id,
            address,
            firstname,
            lastname,
            avatar,
            dateOfBirth,
            grade,
            placeOfBirth,
            birthName,
            memberships: [{ id: membershipId, entryDate, active }]
        }
    }) => ({
        id,
        address,
        firstname,
        lastname,
        avatar,
        dateOfBirth,
        grade,
        placeOfBirth,
        birthName,
        actualMembership: {
            id: membershipId,
            entryDate,
            active
        }
    }),
    validate: () => ({}),
    handleSubmit: () => {}
};

class MemberBasicDetailsWithForm extends React.Component<
    MemberBasicDetailsProps & FormikProps<PersonUpdate>,
    State
> {
    constructor(props: MemberBasicDetailsProps & FormikProps<PersonUpdate>) {
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

    private handleClickSave = async () => {
        const { values, updatePerson } = this.props;

        console.log('values: ', values);

        const updateResult = await updatePerson({
            variables: {
                person: values
            }
        });

        console.log('updateResult: ', updateResult);

        this.setState({ editMode: false });
    };

    render() {
        const { editMode } = this.state;
        const {
            dirty,
            values: {
                firstname,
                lastname,
                avatar,
                dateOfBirth,
                grade,
                placeOfBirth,
                birthName,
                actualMembership: { entryDate, active },
                address
            }
        } = this.props;
        return (
            <Paper>
                <Form>
                    <Grid container spacing={3} justify="center">
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
                                <Typography variant="h3" component="h3">
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
                                <StyledAvatar alt="Profilbild" src={avatar} />
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
                                    handleClickSave={this.handleClickSave}
                                    handleClickDiscard={this.handleClickDiscard}
                                    handleClickBack={this.handleClickBack}
                                    handleClickEdit={this.handleClickEdit}
                                />
                            </Grid>
                        </Grid>
                        <GridDivider />
                        <Grid item xs={12} sm={6}>
                            <Detail
                                label="Geburtsdatum"
                                edit={editMode}
                                name="dateOfBirth"
                                type={DetailType.Date}
                            >
                                {dateOfBirth}
                            </Detail>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DetailAddress
                                namespace="address"
                                address={address}
                                editMode={editMode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Detail
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
                                label="Eintrittsdatum"
                                edit={editMode}
                                name="actualMembership.entryDate"
                                type={DetailType.Date}
                            >
                                {entryDate}
                            </Detail>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Detail
                                label="Status"
                                edit={editMode}
                                name="actualMembership.active"
                                type={DetailType.Text}
                            >
                                {active ? 'Aktiv' : 'Inaktiv'}
                            </Detail>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Detail
                                label="Dienstgrad"
                                name="grade"
                                type={DetailType.Text}
                            >
                                {grade}
                            </Detail>
                        </Grid>
                        <Grid item xs={12} sm={6} />
                    </Grid>
                </Form>
            </Paper>
        );
    }
}

export const MemberBasicDetails = withFormik<
    MemberBasicDetailsProps,
    PersonUpdate
>(formConfig)(MemberBasicDetailsWithForm);
