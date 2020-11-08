import { Node, _Query } from '@feuertiger/schema-graphql';
import { test, describe, expect } from '@jest/globals';

import { createConnection } from '.';

describe('Test relay pagination utils', () => {
    test('should create connection based on query with array of nodes', () => {
        const query: _Query = {
            pageSize: 5,
            page: 0
        };
        const nodes: Array<Node> = [
            {
                id: 'node:1'
            },
            {
                id: 'node:2'
            },
            {
                id: 'node:3'
            },
            {
                id: 'node:4'
            },
            {
                id: 'node:5'
            }
        ];
        const totalCount = 10;

        const connection = createConnection(query, nodes, totalCount);

        expect(connection).toBeTruthy();

        expect(connection.totalCount).toEqual(totalCount);

        expect(connection.edges.length).toEqual(nodes.length);

        expect(connection.pageInfo.hasPreviousPage).toBeFalsy();
        expect(connection.pageInfo.hasNextPage).toBeTruthy();

        expect(connection.pageInfo.startCursor).toEqual('node:1');
        expect(connection.pageInfo.endCursor).toEqual('node:5');

        expect(connection.edges[0].node).toEqual(nodes[0]);
        expect(connection.edges[1].node).toEqual(nodes[1]);
        expect(connection.edges[2].node).toEqual(nodes[2]);
        expect(connection.edges[3].node).toEqual(nodes[3]);
        expect(connection.edges[4].node).toEqual(nodes[4]);
    });
});
