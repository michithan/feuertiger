import React from 'react';
import { default as NextApp, AppInitialProps, AppProps } from 'next/app';

import firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth, {
    WrappedComponentProps
} from 'react-with-firebase-auth';
import firebaseConfig from '../../../secrets.json';

interface AuthProps extends WrappedComponentProps, AppProps {}

export default (WrappedComponent: React.ComponentType<AppProps>) => {
    let firebaseApp: firebase.app.App;

    try {
        firebaseApp = firebase.initializeApp(firebaseConfig);
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
