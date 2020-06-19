import React from 'react';
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { PersonExercisesLeadedFragment } from '@feuertiger/schema-graphql';

import { Paper, Detail, DetailType } from '../index';

export interface MemberExercisesLeadDetailsProps
    extends PersonExercisesLeadedFragment {
    editMode: boolean;
}

interface State {}

export class MemberExercisesLeadDetails extends React.Component<
    MemberExercisesLeadDetailsProps,
    State
> {
    constructor(props: MemberExercisesLeadDetailsProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { exercisesLeaded, editMode } = this.props;
        return (
            <Paper>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <Detail
                            label="Übungen geleitet"
                            edit={editMode}
                            name="exercisesLeaded"
                            type={DetailType.Button}
                        >
                            {exercisesLeaded?.length}
                        </Detail>
                    </Grid>
                    {exercisesLeaded?.length > 0 && (
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
                                    {exercisesLeaded?.map((exercise) => (
                                        <TableRow key={exercise.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {exercise.topic}
                                            </TableCell>
                                            <TableCell align="right">
                                                {exercise?.timeslot?.start}
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
