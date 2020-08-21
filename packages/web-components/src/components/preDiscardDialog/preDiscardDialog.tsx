import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';

export interface PreDiscardDialogProps {
    show: boolean;
    handleClickDiscard: () => any;
    handleClickCancel: () => any;
}

export const PreDiscardDialog = ({
    show,
    handleClickDiscard,
    handleClickCancel
}: PreDiscardDialogProps) => (
    <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">Änderungen Verwerfen</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Sind sie sicher dass sie die Änderungen verwerfen möchten?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={handleClickDiscard}
                variant="contained"
                color="primary"
                autoFocus
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
