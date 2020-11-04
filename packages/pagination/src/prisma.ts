import type { _Query } from '@feuertiger/schema-graphql';

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
    query: _Query,
    searchPropertys?: string[]
): PrismaQuery => {
    const { filters, page, pageSize, orderBy, orderDirection, search } = query;
    return {
        where: {
            AND:
                filters && filters.length > 0
                    ? filters.map(({ column, value }) => ({
                          [column]: value
                      }))
                    : undefined,
            OR:
                search && searchPropertys
                    ? searchPropertys.map(key => ({
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
