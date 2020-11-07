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
    query: _Query,
    nodes: Array<TNode>,
    count: number
): NodeConnection<TNode> => ({
    totalCount: count,
    edges: nodes.map(node => ({
        node,
        cursor: node.id
    })),
    pageInfo: {
        hasNextPage: query.pageSize * query.page < count,
        hasPreviousPage: query.page > 0,
        startCursor: nodes[0]?.id,
        endCursor: nodes[nodes.length - 1]?.id
    }
});

export const mapConnectionToNodes = <TNode extends Node>(
    connection: NodeConnection<TNode>
): Array<TNode> => connection.edges.map(({ node }) => node);
