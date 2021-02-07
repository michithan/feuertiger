import React, { ReactElement } from 'react';
import { MembershipRequestQuery } from '@feuertiger/schema-graphql';
import { Grid, Button, Typography } from '@material-ui/core';

import { Paper } from '..';

interface MembershipRequestProps {
    membershipRequest: MembershipRequestQuery['membershipRequest'] | null;
    cancelRequest: () => void | null;
}

export const MembershipRequest = ({
    membershipRequest,
    cancelRequest
}: MembershipRequestProps): ReactElement => {
    return (
        <Paper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        {`Deine Beitrittsanfrage an ${membershipRequest?.department?.name} wurde gestellt.`}
                    </Typography>
                    <Typography variant="body1">
                        Bitte habe noch etwas geduld.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" onClick={cancelRequest}>
                        Beitrittsanfrage zurückziehen
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};
