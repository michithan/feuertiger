import type { Node, _Query } from '@feuertiger/schema-graphql';
import type { PrismaClient } from '@feuertiger/schema-prisma';

import { createConnection, NodeConnection } from '.';

export interface PrismaQuery {
    where: {
        AND?:
            | Array<{
                  [key: string]: string;
              }>
            | undefined;
        OR?:
            | Array<{
                  [key: string]: {
                      contains: string;
                      mode: 'insensitive';
                  };
              }>
            | undefined;
    };
    take: number;
    orderBy:
        | {
              [key: string]: string;
          }
        | undefined;
    skip: number;
}

export const mapToPrismaQuery = (
    query: _Query | null | undefined,
    searchProperties: string[] | null | undefined
): PrismaQuery => {
    const {
        filters,
        page = 0,
        pageSize = 50,
        orderBy,
        orderDirection,
        search
    } = query ?? {};
    return {
        where: {
            AND:
                filters && filters.length > 0
                    ? filters.map(({ column, value }) => ({
                          [column]: value
                      }))
                    : undefined,
            OR:
                search && searchProperties
                    ? searchProperties.map(key => ({
                          [key]: { contains: search, mode: 'insensitive' }
                      }))
                    : undefined
        },
        take: pageSize,
        orderBy:
            orderBy && orderDirection
                ? {
                      [orderBy]: orderDirection.toLocaleLowerCase()
                  }
                : undefined,
        skip: page * pageSize
    };
};

export const createConnectionResolver = <TNode extends Node>(
    db: PrismaClient,
    count: (args: { where: PrismaQuery['where'] }) => Promise<number>,
    findMany: (args: PrismaQuery) => Promise<Array<TNode>>
) => (
    query: _Query | null | undefined,
    args: PrismaQuery
): Promise<NodeConnection<TNode>> =>
    db
        .$transaction([count({ where: args.where }), findMany(args)])
        .then(([totalCount, nodes]) =>
            createConnection(query, nodes, totalCount)
        );
