import { MaterialTableFetchFunction } from '@feuertiger/pagination';
import { Node } from '@feuertiger/schema-graphql';

export const mockFetchConnection = <TNode extends Node>(
    nodes: Array<TNode>
): MaterialTableFetchFunction<TNode> => query =>
    Promise.resolve({
        data: nodes,
        page: query.page,
        totalCount: nodes.length
    });
