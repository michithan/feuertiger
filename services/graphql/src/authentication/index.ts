import { User } from '@feuertiger/schema-graphql';
import { PrismaClient } from '@feuertiger/schema-prisma';

import { ContextInitialization } from '../context';
import { createGlobalId } from '../utils/id';

export const tryGetUserInfo = async (
    token: string,
    authProvider: ContextInitialization['authProvider'],
    db: PrismaClient
): Promise<User> => {
    const { uid } = await authProvider.verifyIdToken(token);
    const {
        email,
        providerData: [{ email: providerEmail }]
    } = await authProvider.getUser(uid);
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
    return { email: email ?? providerEmail, ...user };
};
