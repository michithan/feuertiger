import { AuthProps } from '../types/authProps';

export const authPropsMock: AuthProps = {
    auth: {
        signOut: (): void => {},
        signInWithEmailAndPassword: (): void => {}
    }
};
