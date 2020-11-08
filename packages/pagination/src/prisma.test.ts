import { _Query } from '@feuertiger/schema-graphql';
import { test, describe, expect } from '@jest/globals';

import { mapToPrismaQuery } from '.';

describe('Test prisma pagination utils', () => {
    test('should map graphql relay query to prisma argument', () => {
        const query: _Query = {
            pageSize: 5,
            page: 0
        };
        const searchPropertys: Array<string> = [];

        const args = mapToPrismaQuery(query, searchPropertys);

        expect(args).toBeTruthy();
    });
});
