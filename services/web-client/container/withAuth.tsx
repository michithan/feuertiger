import React, { ReactElement, ReactNode } from 'react';
import 'firebase/auth';
import { AuthProps } from '@feuertiger/web-components';

import AuthSingleton from './authSingleton';

export interface AuthStateProps {
    isSignedIn: boolean;
    isLoading: boolean;
    error: unknown;
}

interface State extends AuthProps, AuthStateProps {}

export default <
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
        React.Component<P, State, SS>,
        React.ComponentClass<P, State>
    >
>(
    WrappedComponent: CA | ((props: P & AuthProps) => ReactElement)
): C =>
    class AuthWrapper extends React.Component<P, State, SS> {
        constructor(props: P) {
            super(props);
            this.state = {
                isSignedIn: true,
                isLoading: true,
                error: null,
                auth: null
            };
        }

        componentDidMount(): void {
            const authSignleton = new AuthSingleton();
            const { firebaseAuth } = authSignleton;

            firebaseAuth.onAuthStateChanged(async user =>
                this?.setState({ isSignedIn: !!user, isLoading: false })
            );

            this.setState({
                auth: {
                    signInWithEmailAndPassword: async (email, password) => {
                        try {
                            this.setState({ isLoading: true });
                            const credential = await firebaseAuth.signInWithEmailAndPassword(
                                email,
                                password
                            );
                            this.setState({
                                isLoading: false,
                                isSignedIn: true
                            });
                            window.location.reload(true);
                            return credential;
                        } catch (error) {
                            this.setState({ error });
                            throw error;
                        }
                    },
                    signOut: async () => {
                        await firebaseAuth.signOut();
                        window.location.reload(true);
                    }
                }
            });
        }

        render(): ReactNode {
            const { ...props } = this.props;
            const { auth, isSignedIn, isLoading, error } = this.state;

            return (
                <WrappedComponent
                    {...props}
                    auth={auth}
                    isSignedIn={isSignedIn}
                    isLoading={isLoading}
                    error={error}
                />
            );
        }
    } as C;
