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
import { KeyboardDateTimePicker } from '@material-ui/pickers';

interface State {
    startOfEvent: Date;
    endOfEvent: Date;
}

export interface AddExerciseComponentProps {
    handleClose: () => void;
    open: boolean;
}

export class AddExerciseComponent extends React.Component<
    AddExerciseComponentProps,
    State
> {
    constructor(props: AddExerciseComponentProps) {
        super(props);
        this.state = {
            startOfEvent: new Date(),
            endOfEvent: new Date()
        };
    }

    render() {
        const { handleClose, open } = this.props;
        const { startOfEvent } = this.state;
        const { endOfEvent } = this.state;
        return (
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <DialogTitle id="simple-dialog-title">
                    Übung erstellen
                </DialogTitle>
                <DialogContent style={{ overflowY: 'initial' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="exercise-titel"
                                name="Titel"
                                label="Titel"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="typeOfExcercise"
                                name="Art/Gruppe"
                                label="Art/Gruppe"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDateTimePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy HH:mm"
                                margin="normal"
                                id="startOfEvent"
                                label="Übungsstart"
                                value={startOfEvent}
                                onChange={() => {}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDateTimePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy HH:mm"
                                margin="normal"
                                id="endOfEvent"
                                label="Übungsende"
                                value={endOfEvent}
                                onChange={() => {}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="location"
                                name="Ort"
                                label="Ort"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Speichern
                        </Button>
                    </>
                </DialogActions>
            </Dialog>
        );
    }
}

// export const AddExerciseComponent = ({ name }: ChrisComponentProps) => (
//     <p>Hallo {name}</p>
// );
