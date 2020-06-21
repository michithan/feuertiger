import React from 'react';
import MaterialTable from 'material-table';
import {
    Node,
    PersonExercisesParticipatedFragment,
    PersonExercisesNotParticipatedFragment
} from '@feuertiger/schema-graphql';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import { DetailTable } from '../index';

type Exercise = PersonExercisesParticipatedFragment['exercisesParticipated'][0];

export enum UpdateAction {
    NON,
    ADD,
    DELETE
}

export interface Update {
    action?: UpdateAction;
}

export interface MemberExercisesDetailsProps
    extends PersonExercisesParticipatedFragment,
        PersonExercisesNotParticipatedFragment {}

interface State {
    editMode: boolean;
    changes: (Exercise & Update)[];
}

export class MemberExercisesDetails extends React.Component<
    MemberExercisesDetailsProps,
    State
> {
    constructor(props: MemberExercisesDetailsProps) {
        super(props);
        this.state = {
            editMode: false,
            changes: []
        };
    }

    private handleClickEdit = () => {
        const { exercisesParticipated } = this.props;
        this.setState({
            editMode: true,
            changes: exercisesParticipated.map(exercise => ({
                ...exercise
            }))
        });
    };

    private handleClickDiscard = () => this.setState({ changes: [] });

    private handleClickBack = () =>
        this.setState({ editMode: false, changes: [] });

    private handleClickSave = () => {
        this.setState({ editMode: false, changes: [] });
    };

    private handleClickUpdate = async (node: Node, action: UpdateAction) => {
        const { changes } = this.state;

        if (action === UpdateAction.ADD) {
            const change = {
                ...node,
                action: UpdateAction.ADD
            } as typeof changes[0];
            changes.push(change);
            this.setState({ changes });
            return;
        }

        const change = changes.find(({ id }) => id === node.id);
        if (action === UpdateAction.DELETE) {
            change.action = UpdateAction.DELETE;
            this.setState({ changes });
            return;
        }

        if (action === UpdateAction.NON && change.action === UpdateAction.ADD) {
            this.setState({
                changes: changes.filter(({ id }) => id === node.id)
            });
            return;
        }

        if (action === UpdateAction.NON) {
            change.action = null;
            this.setState({ changes });
        }
    };

    render() {
        const { exercisesParticipated, exercisesNotParticipated } = this.props;
        const { editMode, changes } = this.state;

        return (
            <DetailTable
                label="Übungen"
                editMode={editMode}
                handleClickSave={this.handleClickSave}
                handleClickDiscard={this.handleClickDiscard}
                handleClickBack={this.handleClickBack}
                handleClickEdit={this.handleClickEdit}
                addDialogContent={
                    <MaterialTable
                        options={{
                            rowStyle: node => {
                                const toBeAdded =
                                    node.action === UpdateAction.ADD;
                                const toBeDeleted =
                                    node.action === UpdateAction.DELETE;

                                if (toBeAdded) {
                                    return {
                                        backgroundColor: 'rgba(0,255,0,0.5)'
                                    };
                                }

                                if (toBeDeleted) {
                                    return {
                                        backgroundColor: 'rgba(255,0,0,0.5)'
                                    };
                                }
                                return {};
                            }
                        }}
                        actions={[
                            (node: Node) => {
                                const change = changes.find(
                                    ({ id }) => id === node.id
                                );
                                return {
                                    icon: () =>
                                        change ? <CancelIcon /> : <AddIcon />,
                                    tooltip: change
                                        ? 'Hinzufügen  abbrechen'
                                        : 'Hinzufügen',
                                    onClick: change
                                        ? () =>
                                              this.handleClickUpdate(
                                                  change,
                                                  UpdateAction.NON
                                              )
                                        : () =>
                                              this.handleClickUpdate(
                                                  node,
                                                  UpdateAction.ADD
                                              )
                                };
                            }
                        ]}
                        columns={[
                            { title: 'Thema', field: 'topic' },
                            {
                                title: 'Datum',
                                field: 'timeslot.start',
                                type: 'datetime'
                            }
                        ]}
                        data={exercisesNotParticipated.map(
                            (exercise): Exercise => ({
                                ...exercise
                            })
                        )}
                        title=""
                    />
                }
            >
                <MaterialTable
                    options={{
                        rowStyle: node => {
                            const toBeAdded = node.action === UpdateAction.ADD;
                            const toBeDeleted =
                                node.action === UpdateAction.DELETE;

                            if (toBeAdded) {
                                return {
                                    backgroundColor: 'rgba(0,255,0,0.5)'
                                };
                            }

                            if (toBeDeleted) {
                                return {
                                    backgroundColor: 'rgba(255,0,0,0.5)'
                                };
                            }
                            return {};
                        }
                    }}
                    actions={
                        editMode && [
                            (node: Node) => {
                                const change = changes.find(
                                    ({ id, action }) => id === node.id && action
                                );

                                let tooltip = 'Löschen';
                                if (change?.action === UpdateAction.DELETE)
                                    tooltip = 'Löschen  abbrechen';
                                if (change?.action === UpdateAction.ADD)
                                    tooltip = 'Hinzufügen  abbrechen';

                                return {
                                    icon: () =>
                                        change ? (
                                            <CancelIcon />
                                        ) : (
                                            <DeleteIcon />
                                        ),
                                    tooltip,
                                    onClick: change.action
                                        ? () =>
                                              this.handleClickUpdate(
                                                  change,
                                                  UpdateAction.NON
                                              )
                                        : () =>
                                              this.handleClickUpdate(
                                                  change,
                                                  UpdateAction.DELETE
                                              )
                                };
                            }
                        ]
                    }
                    columns={[
                        { title: 'Thema', field: 'topic' },
                        {
                            title: 'Datum',
                            field: 'timeslot.start',
                            type: 'datetime'
                        }
                    ]}
                    data={
                        editMode
                            ? changes
                            : exercisesParticipated.map(
                                  (exercise): Exercise => ({
                                      ...exercise
                                  })
                              )
                    }
                    title=""
                />
            </DetailTable>
        );
    }
}
