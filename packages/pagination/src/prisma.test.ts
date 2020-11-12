import { _Query } from '@feuertiger/schema-graphql';
import { test, describe, expect } from '@jest/globals';

import { mapToPrismaQuery } from '.';

const DEFAULT_FILTERS: Readonly<_Query['filters']> = Object.freeze([
    {
        column: 'test3',
        operator: 'Equals',
        value: 'test4'
    }
]);

const DEFAULT_QUERY: Readonly<_Query> = Object.freeze({
    pageSize: 5,
    page: 0,
    search: 'test1',
    orderBy: 'test2',
    orderDirection: 'ASC',
    filters: Object.create(DEFAULT_FILTERS)
});

const DEFAULT_SEARCH_PROPERTYS: Readonly<Array<string>> = Object.freeze([
    'property'
]);

describe('Test prisma pagination utils', () => {
    test('should map graphql relay query to prisma argument', () => {
        const query: _Query = Object.create(DEFAULT_QUERY);
        const searchPropertys: Array<string> = Object.create(
            DEFAULT_SEARCH_PROPERTYS
        );

        const args = mapToPrismaQuery(query, searchPropertys);

        const { AND, OR } = args.where;
        const filter = query.filters?.[0];
        const {
            filters,
            search,
            orderBy,
            orderDirection,
            page,
            pageSize
        } = query;
        const property = searchPropertys?.[0];

        expect(args).toBeTruthy();
        expect(args.take).toEqual(pageSize);
        expect(args.orderBy).toEqual({
            [orderBy as string]: orderDirection?.toLocaleLowerCase()
        });
        expect(args.skip).toEqual(page * pageSize);

        expect(AND?.length).toEqual(filters?.length);
        expect(filter && AND?.[0]?.[filter?.column]).toEqual(filter?.value);

        expect(search).toBeTruthy();
        expect(property && OR?.[0]?.[property]).toEqual({
            contains: search as string,
            mode: 'insensitive'
        });
    });
});
