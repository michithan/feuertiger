import React from 'react';
import { default as NextApp, AppProps } from 'next/app';
import getConfig from 'next/config';

import firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth, {
    WrappedComponentProps
} from 'react-with-firebase-auth';

const { publicRuntimeConfig } = getConfig();
const { tokens } = publicRuntimeConfig;

export interface AuthProps extends WrappedComponentProps, AppProps {}

export default (WrappedComponent: React.ComponentType<AppProps>) => {
    let firebaseApp: firebase.app.App;

    try {
        firebaseApp = firebase.initializeApp(tokens);
    } catch (error) {
        // we skip the "already exists" message which is
        // not an actual error when we're hot-reloading
        if (!/already exists/.test(error.message)) {
            console.error('Firebase initialization error', error.stack);
        }
    }

    const providers = {};
    const firebaseAppAuth = firebaseApp && firebaseApp.auth();

    const authWrapper = (authProps: AuthProps) => (
        <WrappedComponent {...authProps} />
    );

    return (withFirebaseAuth({
        providers,
        firebaseAppAuth
    })(authWrapper) as unknown) as typeof NextApp;
};
