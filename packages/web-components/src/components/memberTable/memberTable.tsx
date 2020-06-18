import React from 'react';
import { Grid, Button, CircularProgress, Fab, Avatar } from '@material-ui/core';
import MaterialTable from 'material-table';
import FindInPage from '@material-ui/icons/FindInPage';
import { startOcr } from '@feuertiger/ocr';
import { AllPersonsQueryResult } from '@feuertiger/schema-graphql';
import Link from 'next/link';
import { AddMember } from '../addMember/addMember';

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
            error,
            loading,
            data: { allPersons }
        } = this.props;

        let content = null;

        if (loading) {
            content = <CircularProgress />;
        } else if (error) {
            content = <p>Error :(</p>;
        } else if (allPersons) {
            content = (
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
                        { title: 'Hausnummer', field: 'address.streetNumber' },
                        {
                            title: '',
                            field: 'edit',
                            filtering: false,
                            render: ({ id }) => (
                                <Link href="/member/[id]" as={`member/${id}`}>
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
            );
        }

        return (
            <>
                <AddMember
                    startOcr={startOcr}
                    open={addDialogOpen}
                    handleClose={this.handleCloseAddDialog}
                />
                <Grid container spacing={3}>
                    {/* Chart */}
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
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={12} lg={12}>
                        {content}
                    </Grid>
                </Grid>
            </>
        );
    }
}
