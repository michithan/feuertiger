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

interface AuthProps extends WrappedComponentProps, AppProps {}

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
    const firebaseAppAuth = firebaseApp && firebaseApp.auth();
    const providers = {};

    const authWrapper = ({
        user,
        signOut,
        signInWithEmailAndPassword,
        ...pageProps
    }: AuthProps) => {
        if (user) {
            return <WrappedComponent {...pageProps} />;
        }
        return <WrappedComponent {...pageProps} />;
        // return <div>Please sign in.</div>;
    };

    return (withFirebaseAuth({
        providers,
        firebaseAppAuth
    })(authWrapper) as unknown) as typeof NextApp;
};
