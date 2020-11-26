import React, { FormEvent, ReactNode } from 'react';
import {
    TextField,
    Button,
    Avatar,
    Dialog,
    DialogContent,
    Grid,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {
    GoogleLoginButton,
    MicrosoftLoginButton
} from 'react-social-login-buttons';
import styled from 'styled-components';

import { AuthProps, Link } from '../../index';

const PaperDiv = styled.div`
    margin: ${({ theme }) => theme.spacing(8, 4)};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledAvatar = styled(Avatar)`
    margin: ${({ theme }) => theme.spacing(1)} !important;
    background-color: ${({ theme }) => theme.palette.secondary.main};
`;

const StyledForm = styled.form`
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing(1)} !important;
`;

const SubmitButton = styled(Button)`
    margin: ${({ theme }) => theme.spacing(3, 0, 2)} !important;
`;

const OptionButton = styled(Button)`
    color: ${({ theme }) => theme.palette.primary.main} !important;
`;

declare interface LoginFormEvent extends FormEvent<HTMLFormElement> {
    target: {
        email: {
            value: string;
        };
        password: {
            value: string;
        };
    } & FormEvent<HTMLFormElement>['target'];
}

const forgotPasswordLabel = 'Passwort vergessen?';

const singUpLabel = 'Neues konto erstellen';

export type LoginProps = AuthProps;

export class Login extends React.Component<LoginProps> {
    handleEmailLogin = (event: LoginFormEvent): void => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const { auth } = this.props;
        auth.signInWithEmailAndPassword(email, password);
    };

    handleGoogleLogin = (): void => {
        const { auth } = this.props;
        auth.signInWithGoogle();
    };

    handleMicrosoftLogin = (): void => {
        const { auth } = this.props;
        auth.signInWithMicrosoft();
    };

    render(): ReactNode {
        return (
            <Dialog aria-labelledby="login" id="login-dialog" open>
                <DialogContent>
                    <PaperDiv>
                        <StyledAvatar>
                            <LockOutlinedIcon />
                        </StyledAvatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <StyledForm noValidate onSubmit={this.handleEmailLogin}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-Mail-Adresse"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Passwort"
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <SubmitButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                id="login-submit-button"
                            >
                                Anmelden
                            </SubmitButton>
                            <Grid container>
                                <Grid item xs>
                                    <OptionButton variant="text">
                                        {forgotPasswordLabel}
                                    </OptionButton>
                                </Grid>
                                <Grid item>
                                    <OptionButton variant="text">
                                        {singUpLabel}
                                    </OptionButton>
                                </Grid>
                            </Grid>
                        </StyledForm>
                    </PaperDiv>
                    <PaperDiv>
                        <Grid container>
                            <Grid item xs>
                                <GoogleLoginButton
                                    onClick={this.handleGoogleLogin}
                                />
                            </Grid>
                            <Grid item>
                                <MicrosoftLoginButton
                                    onClick={this.handleMicrosoftLogin}
                                />
                            </Grid>
                        </Grid>
                    </PaperDiv>
                </DialogContent>
            </Dialog>
        );
    }
}
