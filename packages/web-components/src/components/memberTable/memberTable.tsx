import React, { ReactNode } from 'react';
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
import type { MaterialTableFetchFunction } from '@feuertiger/pagination';
import type { DepartmentMembershipsQueryResult } from '@feuertiger/schema-graphql';

import { AddMember, Link } from '../index';

interface State {
    addDialogOpen: boolean;
}

export interface MemberTableProps {
    fetchDepartmentMembers: MaterialTableFetchFunction<
        DepartmentMembershipsQueryResult['data']['department']['memberships']['edges'][0]['node']
    >;
}

export class MemberTable extends React.Component<MemberTableProps, State> {
    constructor(props: MemberTableProps) {
        super(props);
        this.state = {
            addDialogOpen: false
        };
    }

    handleOpenAddDialog = (): void => this.setState({ addDialogOpen: true });

    handleCloseAddDialog = (): void => this.setState({ addDialogOpen: false });

    render(): ReactNode {
        const { addDialogOpen } = this.state;
        const { fetchDepartmentMembers: fetchPersons } = this.props;

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
                                render: ({ person: { avatar } }) => (
                                    <Avatar alt="Profil" src={avatar} />
                                )
                            },
                            { title: 'Vorname', field: 'person.firstname' },
                            { title: 'Nachname', field: 'person.lastname' },
                            {
                                title: 'Geburtsdatum',
                                field: 'person.dateOfBirth',
                                type: 'date'
                            },
                            { title: 'Dienstgrad', field: 'person.grade' },
                            { title: 'Straße', field: 'person.address.street' },
                            {
                                title: 'Hausnummer',
                                field: 'person.address.streetNumber'
                            },
                            {
                                title: '',
                                field: 'edit',
                                filtering: false,
                                render: ({ person: { id } }) => (
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
                        data={fetchPersons}
                        title="Mitglieder"
                    />
                </Grid>
            </Grid>
        );
    }
}
