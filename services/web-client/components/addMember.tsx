import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
    handleClose: () => void;
    open: boolean;
}

const AddMember = ({ handleClose, open }: Props) => (
    <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
    >
        <DialogTitle id="simple-dialog-title">Mitglied hinzufügen</DialogTitle>
        <DialogContent>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="Vorname"
                        label="Vorname"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="Nachname"
                        label="Nachname"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="dateOfBirth"
                        label="Geburtsdatum"
                        value={new Date()}
                        onChange={() => {}}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="Stadt"
                        label="Stadt"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zipCode"
                        name="PLZ"
                        label="PLZ"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="street"
                        name="Straße"
                        label="Straße"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="number"
                        name="Nummer"
                        label="Nummer"
                        fullWidth
                    />
                </Grid>
            </Grid>
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

export default AddMember;
