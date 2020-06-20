import React from 'react';
import {
    Grid,
    Button,
    Fab,
    Avatar,
    Breadcrumbs,
    Typography
} from '@material-ui/core';
import MaterialTable from 'material-table';
import FindInPage from '@material-ui/icons/FindInPage';
import { startOcr } from '@feuertiger/ocr';
import { AllPersonsQueryResult } from '@feuertiger/schema-graphql';

import { AddMember, Link } from '../index';

interface State {
    addDialogOpen: boolean;
}

export interface MemberTableProps extends AllPersonsQueryResult {}

export class MemberTable extends React.Component<MemberTableProps, State> {
    constructor(props: MemberTableProps) {
        super(props);
        this.state = {
            addDialogOpen: false
        };
    }

    handleOpenAddDialog = () => this.setState({ addDialogOpen: true });

    handleCloseAddDialog = () => this.setState({ addDialogOpen: false });

    render() {
        const { addDialogOpen } = this.state;
        const {
            data: { allPersons }
        } = this.props;

        return (
            <Grid container spacing={3}>
                <AddMember
                    startOcr={startOcr}
                    open={addDialogOpen}
                    handleClose={this.handleCloseAddDialog}
                />
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/member">Mitglieder</Link>
                        <Typography color="textPrimary">Übersicht</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Button
                        id="add-member-button"
                        variant="contained"
                        color="primary"
                        onClick={this.handleOpenAddDialog}
                    >
                        Mitglied hinzufügen
                    </Button>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <MaterialTable
                        options={{
                            exportButton: true,
                            filtering: true,
                            grouping: true,
                            search: true,
                            sorting: true
                        }}
                        columns={[
                            {
                                title: '',
                                field: 'avatar',
                                filtering: false,
                                render: ({ avatar }) => (
                                    <Avatar alt="Remy Sharp" src={avatar} />
                                )
                            },
                            { title: 'Vorname', field: 'firstname' },
                            { title: 'Nachname', field: 'lastname' },
                            { title: 'Geburtsdatum', field: 'dateOfBirth' },
                            { title: 'Dienstgrad', field: 'grade' },
                            { title: 'Straße', field: 'address.street' },
                            {
                                title: 'Hausnummer',
                                field: 'address.streetNumber'
                            },
                            {
                                title: '',
                                field: 'edit',
                                filtering: false,
                                render: ({ id }) => (
                                    <Link
                                        href="/member/[id]"
                                        as={`/member/${id}`}
                                    >
                                        <Fab color="primary" aria-label="edit">
                                            <FindInPage />
                                        </Fab>
                                    </Link>
                                )
                            }
                        ]}
                        data={allPersons}
                        title="Mitglieder"
                    />
                </Grid>
            </Grid>
        );
    }
}
