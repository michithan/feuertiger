import { ContextInitialization } from '../context';

export interface UserAuthInfo {
    uid: string;
    email: string | null | undefined;
}

export const tryGetUserInfo = async (
    token: string,
    authProvider: ContextInitialization['authProvider']
): Promise<UserAuthInfo> => {
    const { uid } = await authProvider.verifyIdToken(token);
    const { email } = await authProvider.getUser(uid);

    return {
        uid,
        email
    };
};
