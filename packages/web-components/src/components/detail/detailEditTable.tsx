import React from 'react';
import MaterialTable, { MaterialTableProps } from 'material-table';
import { Node } from '@feuertiger/schema-graphql';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import { Box } from '@material-ui/core';
import { DetailTable } from '../index';

export enum UpdateAction {
    NON,
    ADD,
    DELETE
}

export interface Update {
    action?: UpdateAction;
}

export interface DetailEditTableProps<TRowData extends Node>
    extends MaterialTableProps<TRowData> {
    handleSave: (changes: Array<TRowData & Update>) => Promise<void>;
    label: string;
    data: TRowData[];
    connectionData: TRowData[];
    connectionTableProps: Omit<MaterialTableProps<TRowData>, 'data'>;
}

interface State {
    editMode: boolean;
    changes: Array<Node & Update>;
}

export class DetailEditTable extends React.Component<
    DetailEditTableProps<Node>,
    State
> {
    constructor(props: DetailEditTableProps<Node>) {
        super(props);
        this.state = {
            editMode: false,
            changes: []
        };
    }

    private handleClickEdit = () => {
        this.setState({
            editMode: true
        });
    };

    private handleClickDiscard = () => this.setState({ changes: [] });

    private handleClickBack = () =>
        this.setState({ editMode: false, changes: [] });

    private handleClickSave = async () => {
        const { handleSave } = this.props;
        const { changes } = this.state;
        await handleSave(changes);
        this.setState({ editMode: false, changes: [] });
    };

    private handleClickUpdate = async (node: Node, action: UpdateAction) => {
        const { changes } = this.state;
        if (action === UpdateAction.NON) {
            this.setState({
                changes: [...changes.filter(({ id }) => id !== node.id)]
            });
        } else {
            const change = {
                ...node,
                action
            } as typeof changes[0];
            this.setState({ changes: [change, ...changes] });
        }
    };

    private getConnectionRowStyle = (node: Node & Update) => {
        const toBeAdded = node.action === UpdateAction.ADD;
        const toBeDeleted = node.action === UpdateAction.DELETE;

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
    };

    private getRowStyle = (node: Node & Update) => {
        const toBeAdded = node.action === UpdateAction.ADD;
        const toBeDeleted = node.action === UpdateAction.DELETE;

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
    };

    private getConnectionAction = (node: Node & Update) => {
        return {
            icon: () => (node.action ? <CancelIcon /> : <AddIcon />),
            tooltip: node.action ? 'Hinzufügen  abbrechen' : 'Hinzufügen',
            onClick: node.action
                ? () => this.handleClickUpdate(node, UpdateAction.NON)
                : () => this.handleClickUpdate(node, UpdateAction.ADD)
        };
    };

    private getAction = (node: Node & Update) => {
        let tooltip = 'Löschen';
        if (node.action === UpdateAction.DELETE) tooltip = 'Löschen  abbrechen';
        if (node.action === UpdateAction.ADD) tooltip = 'Hinzufügen  abbrechen';

        return {
            icon: () => (node?.action ? <CancelIcon /> : <DeleteIcon />),
            tooltip,
            onClick: node.action
                ? () => this.handleClickUpdate(node, UpdateAction.NON)
                : () => this.handleClickUpdate(node, UpdateAction.DELETE)
        };
    };

    private replaceWithChanges = (data: Node[], changes: Node[]): Node[] =>
        data
            .filter(node => changes.every(change => change.id !== node.id))
            .map(node => ({
                ...node
            }))
            .concat(changes)
            .reverse();

    render() {
        const {
            label,
            data,
            connectionData,
            connectionTableProps,
            ...tableProps
        } = this.props;
        const { editMode, changes } = this.state;

        const dirty = changes.length > 0;

        const additions = changes.filter(
            change => change.action === UpdateAction.ADD
        );

        const actionProps = editMode ? { actions: [this.getAction] } : {};

        return (
            <DetailTable
                label={label}
                dirty={dirty}
                editMode={editMode}
                handleClickSave={this.handleClickSave}
                handleClickDiscard={this.handleClickDiscard}
                handleClickBack={this.handleClickBack}
                handleClickEdit={this.handleClickEdit}
                addDialogContent={
                    <MaterialTable
                        {...connectionTableProps}
                        components={{
                            ...connectionTableProps?.components,
                            Container: Box
                        }}
                        options={{
                            ...connectionTableProps?.options,
                            rowStyle: this.getConnectionRowStyle
                        }}
                        actions={[this.getConnectionAction]}
                        data={this.replaceWithChanges(
                            connectionData,
                            additions
                        )}
                        title="Hinzufügen"
                    />
                }
            >
                <MaterialTable
                    {...tableProps}
                    {...actionProps}
                    components={{
                        ...tableProps?.components,
                        Container: Box
                    }}
                    options={{
                        ...tableProps?.options,
                        rowStyle: this.getRowStyle
                    }}
                    actions={editMode && [this.getAction]}
                    data={this.replaceWithChanges(data, changes)}
                />
            </DetailTable>
        );
    }
}
