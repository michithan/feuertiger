import React from 'react';
import { Grid, TextField, Paper, Avatar, Typography } from '@material-ui/core';
import { Person } from '@feuertiger/schema-graphql';

export interface MemberDetailsProps {
    member: Person;
}

interface State {}

export class MemberDetails extends React.Component<MemberDetailsProps, State> {
    constructor(props: MemberDetailsProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { member } = this.props;
        const { firstname, lastname, avatar } = member;
        return (
            <Paper>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={6} alignContent="center">
                        <Typography variant="h3" component="h3">
                            {firstname} {lastname}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} alignContent="center">
                        <Avatar alt="Remy Sharp" src={avatar} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="Nachname"
                            label="Nachname"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="Stadt"
                            label="Stadt"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zipCode"
                            name="PLZ"
                            label="PLZ"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="street"
                            name="Straße"
                            label="Straße"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="number"
                            name="Nummer"
                            label="Nummer"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
