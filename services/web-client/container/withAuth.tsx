import React, { ReactElement, ReactNode } from 'react';
import 'firebase/auth';
import { AuthProps } from '@feuertiger/web-components';
import type firebase from 'firebase';

import AuthSingleton from './authSingleton';

export interface AuthStateProps {
    isSignedIn: boolean;
    isLoading: boolean;
    error: unknown;
}

const withAuth = <
    P,
    S,
    SS,
    CA extends React.ClassType<
        P & AuthProps,
        React.Component<P & AuthProps, S, SS>,
        React.ComponentClass<P & AuthProps, S>
    >,
    C extends React.ClassType<
        P,
        React.Component<P, AuthStateProps, SS>,
        React.ComponentClass<P, AuthStateProps>
    >
>(
    WrappedComponent: CA | ((props: P & AuthProps) => ReactElement)
): C =>
    (class AuthWrapper extends React.Component<P, AuthStateProps, SS> {
        private unsubscribeAuthState: firebase.Unsubscribe;

        private authSingleton: AuthSingleton;

        constructor(props: P) {
            super(props);
            this.state = {
                isSignedIn: false,
                isLoading: true,
                error: null
            };
        }

        componentDidMount(): void {
            this.authSingleton = new AuthSingleton();
            const { firebaseAuth } = this.authSingleton;
            this.unsubscribeAuthState = firebaseAuth.onAuthStateChanged(user =>
                this.setSignedInState(Boolean(user))
            );
        }

        componentWillUnmount(): void {
            this.unsubscribeAuthState();
        }

        private signInWithEmailAndPassword = async (
            email: string,
            password: string
        ): Promise<void> => {
            const { firebaseAuth } = this.authSingleton;
            try {
                this.setState({ isLoading: true });
                await firebaseAuth.signInWithEmailAndPassword(email, password);
                this.setSignedInState(true);
                window.location.reload();
            } catch (error) {
                this.setState({ error });
                throw error;
            }
        };

        private signInWithGoogle = async (): Promise<void> => {
            const { firebaseAuth, googleAuthProvider } = this.authSingleton;
            await firebaseAuth.signInWithRedirect(googleAuthProvider);
        };

        private signInWithMicrosoft = async (): Promise<void> => {
            const { firebaseAuth, microsoftAuthProvider } = this.authSingleton;
            await firebaseAuth.signInWithRedirect(microsoftAuthProvider);
        };

        private signOut = async (): Promise<void> => {
            const { firebaseAuth } = this.authSingleton;
            await firebaseAuth.signOut();
            window.location.reload();
        };

        private setSignedInState = (isSignedIn: boolean): void =>
            this.setState({
                isSignedIn,
                isLoading: false
            });

        render(): ReactNode {
            const {
                signInWithEmailAndPassword,
                signInWithGoogle,
                signInWithMicrosoft,
                signOut
            } = this;
            const { ...props } = this.props;
            const { isSignedIn, isLoading, error } = this.state;

            return (
                <WrappedComponent
                    {...props}
                    auth={{
                        signInWithEmailAndPassword,
                        signInWithGoogle,
                        signInWithMicrosoft,
                        signOut
                    }}
                    isSignedIn={isSignedIn}
                    isLoading={isLoading}
                    error={error}
                />
            );
        }
    } as unknown) as C;

export default withAuth;
