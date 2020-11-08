import { Node, _Query } from '@feuertiger/schema-graphql';
import { test, describe, expect } from '@jest/globals';
import { Query } from 'material-table';

import { mapFromMaterialTableQuery } from '.';

describe('Test material-ui table pagination utils', () => {
    test('should map query from material-ui table to graphql query argument', () => {
        const query: Query<Node> = {
            page: 0,
            pageSize: 5,
            filters: [],
            orderBy: { field: 'id' },
            orderDirection: 'asc',
            search: '',
            totalCount: 10
        };

        const args = mapFromMaterialTableQuery(query);

        expect(args).toBeTruthy();
    });
});
