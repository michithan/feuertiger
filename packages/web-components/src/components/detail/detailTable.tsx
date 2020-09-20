import React, { ReactElement, ReactNode } from 'react';
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogActions
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Paper, EditButtonGroup } from '../index';

export interface DetailTableProps {
    label: string;
    children: ReactElement | ReactElement[];
    editMode?: boolean;
    addDialogContent?: ReactElement;
    dirty?: boolean;
    handleClickBack?: () => void;
    handleClickDiscard?: () => void;
    handleClickEdit?: () => void;
    handleClickSave?: () => void;
}

interface State {
    addMode: boolean;
}

export class DetailTable extends React.Component<DetailTableProps, State> {
    constructor(props: DetailTableProps) {
        super(props);
        this.state = {
            addMode: false
        };
    }

    private handleClickStartAdding = (): void =>
        this.setState({ addMode: true });

    private handleClickFinishAdding = (): void =>
        this.setState({ addMode: false });

    render(): ReactNode {
        const {
            label,
            editMode,
            children,
            dirty,
            addDialogContent,
            handleClickBack,
            handleClickDiscard,
            handleClickEdit,
            handleClickSave
        } = this.props;
        const { addMode } = this.state;

        return (
            <Paper>
                <Dialog open={addMode} maxWidth="md" fullWidth>
                    <DialogContent>{addDialogContent}</DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClickFinishAdding}
                            variant="contained"
                            color="primary"
                        >
                            Fertig
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} container justify="center">
                        <Grid item xs={3}>
                            {editMode && (
                                <Button
                                    aria-label="add"
                                    onClick={this.handleClickStartAdding}
                                    color="primary"
                                    variant="contained"
                                >
                                    <AddIcon />
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={6} container justify="center">
                            <Typography
                                color="textPrimary"
                                variant="h5"
                                component="h5"
                            >
                                {label}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} container justify="flex-end">
                            <EditButtonGroup
                                handleClickBack={handleClickBack}
                                handleClickDiscard={handleClickDiscard}
                                handleClickEdit={handleClickEdit}
                                handleClickSave={handleClickSave}
                                editMode={editMode}
                                dirty={dirty}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
