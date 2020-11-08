import { Node, _Query } from '@feuertiger/schema-graphql';
import { test, describe, expect } from '@jest/globals';
import { Query } from 'material-table';

import { mapFromMaterialTableQuery } from '.';

const DEFAULT_QUERY: Readonly<Query<Node>> = Object.freeze({
    page: 0,
    pageSize: 5,
    filters: [],
    orderBy: { field: 'id' },
    orderDirection: 'asc',
    search: '',
    totalCount: 10
});

describe('Test material-ui table pagination utils', () => {
    test('should map query from material-ui table to graphql query argument', () => {
        const query: Query<Node> = Object.create(DEFAULT_QUERY);

        const args = mapFromMaterialTableQuery(query);

        expect(args).toBeTruthy();
    });
});
