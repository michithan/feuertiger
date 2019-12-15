import React from 'react';
import getConfig from 'next/config';

import firebase from 'firebase/app';
import 'firebase/auth';

export interface AuthProps {
    auth?: firebase.auth.Auth;
}

export interface AuthStateProps {
    isSignedIn: boolean;
    isLoading: boolean;
    error: any;
}

const updatetoken = async (user: firebase.User) => {
    const token = await user.getIdToken();
    localStorage.setItem('token', token);
};

const removeToken = () => localStorage.removeItem('token');

interface State extends AuthProps, AuthStateProps {}

export default <TProps extends any>(
    WrappedComponent: React.ComponentType<TProps & AuthProps & AuthStateProps>
): React.ComponentType<TProps> =>
    class AuthWrapper extends React.Component<TProps, State> {
        constructor(props: TProps) {
            super(props);
            this.state = {
                isSignedIn: true,
                isLoading: true,
                error: null,
                auth: null
            };
        }

        componentDidMount() {
            const { publicRuntimeConfig } = getConfig();
            const { tokens } = publicRuntimeConfig;

            const firebaseApp = firebase.initializeApp(tokens);
            const firebaseAuth: firebase.auth.Auth = firebaseApp.auth();

            firebaseAuth.onAuthStateChanged(async user => {
                if (user) {
                    await updatetoken(user);
                }
                this.setState({ isSignedIn: !!user, isLoading: false });
            });
            const auth: firebase.auth.Auth = {
                ...firebaseAuth
            };

            auth.signInWithEmailAndPassword = async (email, password) => {
                try {
                    this.setState({ isLoading: true });
                    const credential = await firebaseAuth.signInWithEmailAndPassword(
                        email,
                        password
                    );

                    await updatetoken(credential.user);

                    this.setState({
                        isLoading: false,
                        isSignedIn: true
                    });

                    location.reload(true);
                    return credential;
                } catch (error) {
                    this.setState({ error });
                    throw error;
                }
            };

            auth.signOut = async () => {
                await firebaseAuth.signOut();
                removeToken();
                location.reload(true);
            };

            this.setState({
                auth
            });
        }

        render() {
            const { ...props } = this.props;
            const { auth, isSignedIn, isLoading, error } = this.state;

            return (
                <WrappedComponent
                    // eslint-disable-next-line
                    {...props}
                    auth={auth}
                    isSignedIn={isSignedIn}
                    isLoading={isLoading}
                    error={error}
                />
            );
        }
    };
