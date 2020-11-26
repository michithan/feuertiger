export interface AuthProps {
    auth: {
        signOut: () => void;
        signInWithEmailAndPassword: (
            email: string,
            password: string
        ) => Promise<void>;
        signInWithGoogle: () => Promise<void>;
        signInWithMicrosoft: () => Promise<void>;
    };
}
