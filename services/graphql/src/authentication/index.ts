import { Viewer } from '@feuertiger/schema-graphql';

import { Context, ContextInitialization } from '../context';
import { createGlobalId } from '../utils/id';

export interface UserAuthInfo {
    uid: string;
    email: string;
}

export const tryGetUserInfo = async (
    token: string,
    authProvider: ContextInitialization['authProvider']
): Promise<UserAuthInfo> => {
    const { uid } = await authProvider.verifyIdToken(token);
    const {
        email,
        providerData: [{ email: providerEmail }]
    } = await authProvider.getUser(uid);

    return {
        uid,
        email: email ?? providerEmail
    };
};

export const getOrCreateViewer = async ({
    db,
    user: { uid, email }
}: Context): Promise<Viewer> => {
    let user = await db.user.findFirst({
        where: {
            uid
        }
    });

    if (!user) {
        user = await db.user.create({
            data: { id: createGlobalId('user'), uid }
        });
    }

    return {
        ...user,
        email
    };
};
