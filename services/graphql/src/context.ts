import firebase from 'firebase-admin';
import { AuthenticationError } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { PrismaClient } from '@feuertiger/schema-prisma';
import { migrateAndSeed } from '@feuertiger/migrations';

export interface Context {
    db: PrismaClient;
    user: {
        uid: string;
    };
}

export const prisma = new PrismaClient();

migrateAndSeed(prisma);

export default async ({ req }: ExpressContext): Promise<Context | void> => {
    const token = req.headers.authorization || '';
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token);
        const context: Context = {
            db: prisma,
            user: {
                uid: decodedToken.uid
            }
        };
        return context;
    } catch (error) {
        throw new AuthenticationError('you must be logged in');
    }
};
