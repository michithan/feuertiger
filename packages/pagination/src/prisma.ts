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
                  [key: string]: string;
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
            AND: filters
                ? filters.map(({ column, value }) => ({
                      [column]: value
                  }))
                : undefined,
            OR:
                search && searchPropertys
                    ? Object.assign(
                          {},
                          ...searchPropertys.map(key => ({ [key]: search }))
                      )
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
