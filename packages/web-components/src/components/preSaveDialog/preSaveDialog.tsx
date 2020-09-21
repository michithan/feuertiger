import React, { ReactElement } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';

export interface PreSaveDialogProps {
    show: boolean;
    handleClickSave: () => unknown;
    handleClickDiscard: () => unknown;
    handleClickCancel: () => unknown;
}

export const PreSaveDialog = ({
    show,
    handleClickSave,
    handleClickDiscard,
    handleClickCancel
}: PreSaveDialogProps): ReactElement => (
    <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">Änderungen übernehmen</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Sind sie sicher dass sie die Änderungen übernehmen möchten?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={handleClickSave}
                variant="contained"
                color="primary"
                autoFocus
            >
                Übernehmen
            </Button>
            <Button
                onClick={handleClickDiscard}
                variant="contained"
                color="primary"
            >
                Verwerfen
            </Button>
            <Button
                onClick={handleClickCancel}
                variant="contained"
                color="primary"
            >
                Abbrechen
            </Button>
        </DialogActions>
    </Dialog>
);
