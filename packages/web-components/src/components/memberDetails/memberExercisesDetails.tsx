import React from 'react';
import MaterialTable from 'material-table';
import { PersonExercisesParticipatedFragment } from '@feuertiger/schema-graphql';

import { DetailTable } from '../index';

export interface MemberExercisesDetailsProps
    extends PersonExercisesParticipatedFragment {}

interface State {
    editMode: boolean;
}

export class MemberExercisesDetails extends React.Component<
    MemberExercisesDetailsProps,
    State
> {
    constructor(props: MemberExercisesDetailsProps) {
        super(props);
        this.state = { editMode: false };
    }

    private handleClickEdit = () => this.setState({ editMode: true });

    private handleClickDiscard = () => {
        this.setState({ editMode: true });
    };

    private handleClickBack = () => {
        this.setState({ editMode: false });
    };

    private handleClickSave = () => {
        this.setState({ editMode: false });
    };

    render() {
        const { exercisesParticipated } = this.props;
        const { editMode } = this.state;

        const editConfig = editMode
            ? {
                  isEditable: () => true
              }
            : {};

        return (
            <DetailTable
                label="Übungen"
                editMode={editMode}
                handleClickSave={this.handleClickSave}
                handleClickDiscard={this.handleClickDiscard}
                handleClickBack={this.handleClickBack}
                handleClickEdit={this.handleClickEdit}
            >
                <MaterialTable
                    editable={editConfig}
                    options={{
                        search: true
                    }}
                    columns={[
                        { title: 'Thema', field: 'topic' }
                        // { title: 'Datum', field: 'lastname' }
                    ]}
                    data={exercisesParticipated.map(exercise => ({
                        ...exercise
                    }))}
                    title="Mitglieder"
                />
            </DetailTable>
        );
    }
}
