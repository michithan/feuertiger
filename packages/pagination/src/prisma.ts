import type { Node, _Query } from '@feuertiger/schema-graphql';
import type { PrismaClient } from '@feuertiger/schema-prisma';

import { createConnection, NodeConnection } from '.';

type AnyDelegateKey = Exclude<keyof PrismaClient, `$${string}`>;
type AnyDelegate = PrismaClient[AnyDelegateKey];

export type PrismaQuery<TDelegate extends AnyDelegate> = Parameters<
    TDelegate['findMany']
>[0];

type ConnectionResolver<TArgs> = <TNode extends Node>(
    query: _Query | null | undefined,
    args: TArgs
) => Promise<NodeConnection<TNode>>;

export const createConnectionResolver = <TDelegateKey extends AnyDelegateKey>(
    db: PrismaClient,
    delegateKey: TDelegateKey
): ConnectionResolver<PrismaQuery<PrismaClient[TDelegateKey]>> => {
    const {
        [delegateKey]: { count, findMany }
    } = db;

    type Args = Parameters<typeof findMany>[0];
    type Count = (args: Args) => ReturnType<typeof count>;
    type FindMany = (args: Args) => ReturnType<typeof findMany>;

    return <TNode extends Node>(
        query: _Query | null | undefined,
        args: Args
    ): Promise<NodeConnection<TNode>> => {
        const getCount = (count as Count)(args);
        const getNodes = (findMany as FindMany)(args);

        const transaction = [getCount, getNodes] as Parameters<
            typeof db.$transaction
        >[0];

        return db
            .$transaction(transaction)
            .then(([totalCount, nodes]) =>
                createConnection(query, nodes as TNode[], totalCount as number)
            );
    };
};

export const buildPrismaFilter = (filter: string | number, keys: string[]) =>
    keys.map(key => ({
        [key]: {
            contains: filter,
            mode: 'insensitive'
        }
    }));
