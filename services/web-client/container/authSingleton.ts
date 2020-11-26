import getConfig from 'next/config';

import firebase from 'firebase/app';
import 'firebase/auth';

export default class AuthSingleton {
    public firebaseAuth: firebase.auth.Auth;

    public googleAuthProvider: firebase.auth.GoogleAuthProvider;

    public microsoftAuthProvider: firebase.auth.OAuthProvider;

    static instance: AuthSingleton;

    constructor() {
        if (AuthSingleton.instance) {
            return AuthSingleton.instance;
        }

        const {
            publicRuntimeConfig: { tokens }
        } = getConfig();

        const firebaseApp = firebase.initializeApp(tokens);

        this.firebaseAuth = firebaseApp.auth();
        this.firebaseAuth.useDeviceLanguage();

        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.googleAuthProvider.addScope(
            'https://www.googleapis.com/auth/contacts.readonly'
        );

        this.microsoftAuthProvider = new firebase.auth.OAuthProvider(
            'microsoft.com'
        );
        this.microsoftAuthProvider.setCustomParameters({
            // Force re-consent.
            prompt: 'consent',
            // Target specific email with login hint.
            login_hint: 'user@firstadd.onmicrosoft.com'
        });

        AuthSingleton.instance = this;
    }
}
