import { AuthProps } from '../types/authProps';

export const authPropsMock: AuthProps = {
    auth: {
        signOut: (): void => {},
        signInWithEmailAndPassword: async (
            email: string,
            password: string
        ): Promise<void> => {
            email.toLowerCase();
            password.toLowerCase();
        },
        signInWithGoogle: async (): Promise<void> => {},
        signInWithMicrosoft: async (): Promise<void> => {}
    }
};
