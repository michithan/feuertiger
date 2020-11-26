import { AuthenticationError } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { PrismaClient } from '@feuertiger/schema-prisma';
import type firebase from 'firebase-admin';

import { tryGetUserInfo, UserAuthInfo } from './authentication';

export interface ContextInitialization {
    prisma: PrismaClient;
    authProvider: firebase.auth.Auth;
}

export interface Context {
    db: PrismaClient;
    user: UserAuthInfo;
}

export default ({ prisma, authProvider }: ContextInitialization) => async ({
    req
}: ExpressContext): Promise<Context | void> => {
    const token = req.headers.authorization || '';
    try {
        const user = await tryGetUserInfo(token, authProvider);
        const context: Context = {
            db: prisma,
            user
        };
        return context;
    } catch (error) {
        throw new AuthenticationError('you must be logged in');
    }
};
