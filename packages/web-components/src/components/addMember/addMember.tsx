import React, { ReactElement, useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Fab,
    Typography,
    DialogContentText
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import Webcam from 'react-webcam';

type WebcamRef = React.RefObject<Webcam> & React.RefObject<HTMLVideoElement>;

export interface AddMemberProps {
    handleClose: () => void;
    open: boolean;
    startOcr: (
        video: HTMLVideoElement,
        handleData: (data: string) => void
    ) => Promise<() => void>;
}

const videoConstraints = {
    // width: 1280,
    // height: 720,
    facingMode: 'environment'
};

export const AddMember = ({
    handleClose,
    open,
    startOcr
}: AddMemberProps): ReactElement => {
    const [showCam, setShowCam] = useState(false);
    const [ocrData, setOcrData] = useState<string>();
    const [dateOfBirth] = useState(new Date());

    const webcamRef: WebcamRef = React.createRef();

    let stopOcr: () => void | undefined;

    useEffect(() => () => {
        if (stopOcr) {
            stopOcr();
        }
    });

    const handleOCR = () => setShowCam(true);
    const handleOCRData = (data: string) => setOcrData(data);

    const handleCapture = (): void => {
        if (stopOcr) {
            stopOcr();
        }
        setShowCam(false);
    };
    const handleUserMedia = async (): Promise<void> => {
        const { video } = webcamRef.current;
        stopOcr = await startOcr(video, handleOCRData);
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">
                Mitglied hinzufügen
            </DialogTitle>
            <DialogContent style={{ overflowY: 'initial' }}>
                {showCam ? (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Webcam
                                style={{ width: '100%' }}
                                onUserMedia={handleUserMedia}
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DialogContentText>{ocrData}</DialogContentText>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography color="inherit" noWrap>
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    onClick={handleOCR}
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
                        {/* TODO fix this issue */}
                        <Grid item xs={12}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateOfBirth"
                                label="Geburtsdatum"
                                value={dateOfBirth}
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
                    <Button autoFocus onClick={handleCapture} color="primary">
                        Übernehmen
                    </Button>
                ) : (
                    <>
                        <Button autoFocus onClick={handleClose} color="primary">
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
};
