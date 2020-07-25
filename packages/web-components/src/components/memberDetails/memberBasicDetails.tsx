import {
    PersonUpdate,
    UpdatePersonMutationFn,
    Person
} from '@feuertiger/schema-graphql';
import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import { Form, FormikProps, withFormik, WithFormikConfig } from 'formik';
import { withSnackbar, ProviderContext } from 'notistack';
import React from 'react';
import styled from 'styled-components';
import {
    Detail,
    DetailAddress,
    DetailType,
    EditButtonGroup,
    Paper
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
            address: {
                id: addressId,
                city,
                country,
                postalCode,
                street,
                streetNumber
            },
            firstname,
            lastname,
            avatar,
            dateOfBirth,
            placeOfBirth,
            birthName
        }
    }) => ({
        id,
        address: {
            id: addressId,
            city,
            country,
            postalCode,
            street,
            streetNumber
        },
        firstname,
        lastname,
        avatar,
        dateOfBirth: new Date(dateOfBirth),
        placeOfBirth,
        birthName
    }),
    validate: () => ({}),
    handleSubmit: () => {}
};

class MemberBasicDetailsWithForm extends React.Component<
    MemberBasicDetailsProps & FormikProps<PersonUpdate> & ProviderContext,
    State
> {
    constructor(
        props: MemberBasicDetailsProps &
            FormikProps<PersonUpdate> &
            ProviderContext
    ) {
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
        const { values, updatePerson, enqueueSnackbar } = this.props;
        try {
            await updatePerson({
                variables: {
                    person: values
                }
            });
            enqueueSnackbar('Änderungen übernommen.', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Fehler! ', { variant: 'error' });
        }
        this.setState({ editMode: false });
    };

    render() {
        const { editMode } = this.state;
        const {
            dirty,
            member: {
                grade,
                actualMembership: { entryDate, active }
            },
            values: {
                firstname,
                lastname,
                avatar,
                dateOfBirth,
                placeOfBirth,
                birthName,
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
                                value={dateOfBirth}
                            />
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
                                value={placeOfBirth}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Detail
                                label="Geburtsname"
                                edit={editMode}
                                name="birthName"
                                type={DetailType.Text}
                                value={birthName}
                            />
                        </Grid>
                        <GridDivider />
                        <Grid item xs={12} sm={6}>
                            <Detail
                                label="Eintrittsdatum"
                                name="actualMembership.entryDate"
                                type={DetailType.Date}
                                value={new Date(entryDate)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Detail
                                label="Status"
                                name="actualMembership.active"
                                type={DetailType.Text}
                                value={active ? 'Aktiv' : 'Inaktiv'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Detail
                                label="Dienstgrad"
                                name="grade"
                                type={DetailType.Text}
                                value={grade}
                            />
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
>(formConfig)(withSnackbar(MemberBasicDetailsWithForm));
