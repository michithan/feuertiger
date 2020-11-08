import { Node, _Query } from '@feuertiger/schema-graphql';
import { test, describe, expect } from '@jest/globals';

import { createConnection } from '.';

const DEFAULT_QUERY: Readonly<_Query> = Object.freeze({
    pageSize: 5,
    page: 0
});

const DEFAULT_NODES: Readonly<Array<Node>> = Object.freeze([
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
]);

const DEFAULT_TOTAL_COUNT: Readonly<number> = Object.freeze(10);

describe('Test relay pagination utils', () => {
    test('should create connection based on query with array of nodes', () => {
        const query: _Query = Object.create(DEFAULT_QUERY);
        const nodes: Array<Node> = Object.create(DEFAULT_NODES);
        const totalCount = DEFAULT_TOTAL_COUNT;

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
