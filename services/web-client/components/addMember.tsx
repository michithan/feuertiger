import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Fab,
    Typography
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import Webcam from 'react-webcam';

interface Props {
    handleClose: () => void;
    open: boolean;
}

interface State {
    showCam: boolean;
}

const videoConstraints = {
    // width: 1280,
    // height: 720,
    facingMode: 'user'
};

export default class AddMember extends React.Component<Props, State> {
    webcamRef: React.RefObject<Webcam>;

    constructor(props: Props) {
        super(props);
        this.state = {
            showCam: false
        };
        this.webcamRef = React.createRef();
    }

    handleOCR = async () => {
        this.setState({ showCam: true });
    };

    handleCapture = capture => {
        console.log('capture:', capture);
        const imageSrc = this.webcamRef.current.getScreenshot();
        console.log('imageSrc:', imageSrc);
        this.setState({ showCam: false });
    };

    render() {
        const { handleClose, open } = this.props;
        const { showCam } = this.state;
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
                    {showCam ? (
                        <Webcam
                            audio={false}
                            ref={this.webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography color="inherit" noWrap>
                                    <Fab
                                        color="primary"
                                        aria-label="edit"
                                        onClick={this.handleOCR}
                                    >
                                        <CenterFocusStrongIcon />
                                    </Fab>
                                </Typography>
                            </Grid>
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
                    )}
                </DialogContent>
                <DialogActions>
                    {showCam ? (
                        <Button
                            autoFocus
                            onClick={this.handleCapture}
                            color="primary"
                        >
                            Capture
                        </Button>
                    ) : (
                        <>
                            <Button
                                autoFocus
                                onClick={handleClose}
                                color="primary"
                            >
                                Abbrechen
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Speichern
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}
