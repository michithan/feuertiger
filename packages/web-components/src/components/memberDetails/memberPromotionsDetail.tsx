import React from 'react';
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { PersonPromotionsFragment } from '@feuertiger/schema-graphql';

import { Paper, Detail, DetailType } from '../index';

export interface MemberPromotionsDetailProps extends PersonPromotionsFragment {
    editMode: boolean;
}

interface State {}

export class MemberPromotionsDetail extends React.Component<
    MemberPromotionsDetailProps,
    State
> {
    constructor(props: MemberPromotionsDetailProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { promotions, editMode } = this.props;
        return (
            <Paper>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <Detail
                            label="Beförderungen"
                            edit={editMode}
                            name="exercisesParticipated"
                            type={DetailType.Button}
                        >
                            {promotions?.length}
                        </Detail>
                    </Grid>
                    {promotions?.length > 0 && (
                        <Grid item xs={12}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Thema</TableCell>
                                        <TableCell align="right">
                                            Datum
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {promotions?.map((promotion) => (
                                        <TableRow key={promotion.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {promotion.grade}
                                            </TableCell>
                                            <TableCell align="right">
                                                {promotion.dateOfPromotion}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        );
    }
}
