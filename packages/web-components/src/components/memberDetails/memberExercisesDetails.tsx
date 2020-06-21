import React from 'react';
import {
    PersonExercisesParticipatedFragment,
    PersonExercisesNotParticipatedFragment,
    Exercise
} from '@feuertiger/schema-graphql';

import { Box } from '@material-ui/core';
import { DetailEditTable } from '../index';

export interface MemberExercisesDetailsProps
    extends PersonExercisesParticipatedFragment,
        PersonExercisesNotParticipatedFragment {}

interface State {}

export class MemberExercisesDetails extends React.Component<
    MemberExercisesDetailsProps,
    State
> {
    constructor(props: MemberExercisesDetailsProps) {
        super(props);
        this.state = {};
    }

    private handleSave = async (changes: Exercise[]) => {
        console.log(changes);
    };

    render() {
        const { exercisesParticipated, exercisesNotParticipated } = this.props;

        return (
            <DetailEditTable
                label="Übungen"
                handleSave={this.handleSave}
                connectionTableProps={{
                    columns: [
                        { title: 'Thema', field: 'topic' },
                        {
                            title: 'Datum',
                            field: 'timeslot.start',
                            type: 'datetime'
                        }
                    ]
                }}
                columns={[
                    { title: 'Thema', field: 'topic' },
                    {
                        title: 'Datum',
                        field: 'timeslot.start',
                        type: 'datetime'
                    }
                ]}
                title=""
                connectionData={exercisesNotParticipated}
                data={exercisesParticipated}
            />
        );
    }
}
