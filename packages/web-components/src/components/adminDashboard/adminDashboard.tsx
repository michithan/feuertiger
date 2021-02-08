import React, { ReactElement } from 'react';
import MaterialTable from 'material-table';
import { Grid, Box, Button } from '@material-ui/core';
import { AdminQuery } from '@feuertiger/schema-graphql';

import { Paper } from '..';

export interface AdminDashboardProps {
    adminData: AdminQuery['admin'];
    resolveMembershipRequest: (membershipRequestId: string) => Promise<boolean>;
}

export const AdminDashboard = ({
    adminData,
    resolveMembershipRequest
}: AdminDashboardProps): ReactElement => {
    const { unresolvableMembershipRequests } = adminData ?? {};
    console.log(unresolvableMembershipRequests);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <MaterialTable
                        title="Feuerwehr Erstregistrierungen"
                        components={{
                            Container: Box
                        }}
                        options={{
                            search: true,
                            sorting: true
                        }}
                        columns={[
                            { title: 'User', field: 'user.email' },
                            { title: 'Department', field: 'department.name' },
                            {
                                render: ({ id }) => (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() =>
                                            resolveMembershipRequest(id)
                                        }
                                    >
                                        Bestätigen
                                    </Button>
                                )
                            }
                        ]}
                        data={unresolvableMembershipRequests?.map(element => ({
                            ...element
                        }))}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};
