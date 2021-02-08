import { AuthenticationError } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { PrismaClient } from '@feuertiger/schema-prisma';
import type { User } from '@feuertiger/schema-graphql';
import type firebase from 'firebase-admin';

import { tryGetUserInfo } from './authentication';

export interface ContextInitialization {
    prisma: PrismaClient;
    authProvider: firebase.auth.Auth;
}

export interface Context {
    db: PrismaClient;
    user: User;
}

export default ({ prisma, authProvider }: ContextInitialization) => async ({
    req
}: ExpressContext): Promise<Context | void> => {
    const token = req.headers.authorization || '';
    try {
        const user = await tryGetUserInfo(token, authProvider, prisma);
        const context: Context = {
            db: prisma,
            user
        };
        return context;
    } catch (error) {
        throw new AuthenticationError('you must be logged in');
    }
};
