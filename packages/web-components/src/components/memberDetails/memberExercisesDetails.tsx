import React from 'react';
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { PersonExercisesParticipatedFragment } from '@feuertiger/schema-graphql';

import { Paper, Detail, DetailType } from '../index';

export interface MemberExercisesDetailsProps
    extends PersonExercisesParticipatedFragment {
    editMode: boolean;
}

interface State {}

export class MemberExercisesDetails extends React.Component<
    MemberExercisesDetailsProps,
    State
> {
    constructor(props: MemberExercisesDetailsProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { exercisesParticipated, editMode } = this.props;
        return (
            <Paper>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <Detail
                            label="Übungen teilgenommen"
                            edit={editMode}
                            name="exercisesParticipated"
                            type={DetailType.Button}
                        >
                            {exercisesParticipated?.length}
                        </Detail>
                    </Grid>
                    {exercisesParticipated?.length > 0 && (
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
                                    {exercisesParticipated?.map((exercise) => (
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
