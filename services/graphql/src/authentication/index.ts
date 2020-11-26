import { Viewer } from '@feuertiger/schema-graphql';

import { Context, ContextInitialization } from '../context';
import { createGlobalId } from '../utils/id';

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

export const getOrCreateViewer = async ({
    db,
    user: { uid }
}: Context): Promise<Viewer> => {
    const user = await db.user.findFirst({
        where: {
            uid
        }
    });

    if (user) {
        return user;
    }

    const newUser = db.user.create({
        data: { id: createGlobalId('user'), uid }
    });

    return newUser;
};
