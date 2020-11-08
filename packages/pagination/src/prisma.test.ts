import { _Query } from '@feuertiger/schema-graphql';
import { test, describe, expect } from '@jest/globals';

import { mapToPrismaQuery } from '.';

const DEFAULT_QUERY: Readonly<_Query> = Object.freeze({
    pageSize: 5,
    page: 0
});

const DEFAULT_SEARCH_PROPERTYS: Readonly<Array<string>> = Object.freeze([]);

describe('Test prisma pagination utils', () => {
    test('should map graphql relay query to prisma argument', () => {
        const query: _Query = Object.create(DEFAULT_QUERY);
        const searchPropertys: Array<string> = Object.create(
            DEFAULT_SEARCH_PROPERTYS
        );

        const args = mapToPrismaQuery(query, searchPropertys);

        expect(args).toBeTruthy();
    });
});
