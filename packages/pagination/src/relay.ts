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
    count: number
): NodeConnection<TNode> => ({
    totalCount: count,
    edges: nodes.map(node => ({
        node,
        cursor: node.id
    })),
    pageInfo: {
        hasNextPage: query ? query.pageSize * query.page < count : false,
        hasPreviousPage: query ? query.page > 0 : false,
        startCursor: nodes[0]?.id,
        endCursor: nodes[nodes.length - 1]?.id
    }
});
