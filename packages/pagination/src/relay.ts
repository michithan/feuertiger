import '@feuertiger/native-js-extensions';
import type {
    Node,
    Edge,
    Connection,
    _Query
} from '@feuertiger/schema-graphql';

export interface NodeEdge<TNode extends Node> extends Edge {
    node: TNode;
}

export interface NodeConnection<TNode extends Node> extends Connection {
    edges: Array<NodeEdge<TNode>>;
}

export const createConnection = <TNode extends Node>(
    query: _Query | null | undefined,
    nodes: Array<TNode>,
    totalCount: number
): NodeConnection<TNode> => ({
    totalCount,
    edges: nodes.map(node => ({
        node,
        cursor: node.id
    })),
    pageInfo: {
        hasNextPage: query
            ? (query.pageSize + 1) * query.page < totalCount
            : false,
        hasPreviousPage: query ? query.page > 0 : false,
        startCursor: nodes[0]?.id,
        endCursor: nodes[nodes.length - 1]?.id
    }
});

export const createConnectionFromNodes = <TNode extends Node>(
    nodes: Array<TNode>
): NodeConnection<TNode> => ({
    totalCount: nodes.length,
    edges: nodes.map(node => ({
        node,
        cursor: node.id
    })),
    pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: nodes.first()?.id,
        endCursor: nodes.last()?.id
    }
});
