/* eslint-disable import/prefer-default-export */
import { AuthProps } from '../types/authProps';

export const authPropsMock: AuthProps = {
    auth: {
        signOut: () => {},
        signInWithEmailAndPassword: () => {}
    }
};
