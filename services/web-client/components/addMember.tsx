import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@material-ui/core';

interface Props {
    handleClose: () => void;
    open: boolean;
}

const AddMember = ({ handleClose, open }: Props) => {
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">
                Mitglied hinzufügen
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Abbrechen
                </Button>
                <Button onClick={handleClose} color="primary">
                    Speichern
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMember;
