/* eslint-disable @typescript-eslint/ban-types */
import type {
    Node,
    FilterOperator,
    _Query,
    _QueryFilter
} from '@feuertiger/schema-graphql';
import type {
    Filter,
    Query,
    QueryResult as MaterialTableQueryResult
} from 'material-table';
import type {
    QueryResult,
    OperationVariables,
    ApolloQueryResult
} from '@apollo/client';

import { NodeConnection } from '.';

declare global {
    interface String {
        toUpperCase(this: 'asc' | 'desc'): 'ASC' | 'DESC';
    }
}

export type MaterialTableFetchFunction<TNode extends Node> = (
    query: Query<TNode>
) => Promise<MaterialTableQueryResult<TNode>>;

export interface WithQuery {
    query: _Query;
}

const mapOperator = <TNode extends Node>(
    operator: Filter<TNode>['operator']
): FilterOperator | undefined => {
    switch (operator) {
        case '=':
            return 'Equals';
        default:
            return undefined;
    }
};

const buildFilters = <TNode extends Node>(
    queryFilter: Query<TNode>['filters']
): _Query['filters'] | undefined =>
    queryFilter
        .map(({ value, operator, column }) => ({
            column: column?.field,
            operator: mapOperator(operator),
            value
        }))
        .filter(
            <
                (filter: {
                    column: string | keyof TNode | undefined;
                    operator: FilterOperator | undefined;
                    value: string | undefined;
                }) => filter is _QueryFilter
            >(({ column, value, operator }) =>
                column &&
                operator &&
                value &&
                typeof column === 'string' &&
                typeof operator !== 'undefined' &&
                typeof value === 'string')
        );

export const mapFromMaterialTableQuery = <TNode extends Node>({
    page,
    pageSize,
    filters,
    orderBy,
    orderDirection,
    search
}: Query<TNode>): _Query => {
    return {
        page,
        pageSize,
        filters: buildFilters(filters),
        orderBy: typeof orderBy?.field === 'string' ? orderBy.field : undefined,
        orderDirection: orderDirection?.toUpperCase() || 'ASC',
        search: search || undefined
    };
};

export const mapNodesToQueryResult = <TNode extends Node>(
    connection: NodeConnection<TNode>,
    query: Query<TNode>
): MaterialTableQueryResult<TNode> => ({
    data: connection.edges.map(({ node }) => ({ ...node })),
    page: query.page,
    totalCount: connection.totalCount
});

export const createMaterialTableFetchFunction = <
    TQuery extends object,
    TNode extends Node,
    TVariables extends WithQuery = OperationVariables & WithQuery
>(
    observableQuery: QueryResult<TQuery, TVariables>,
    getConnection: (result: ApolloQueryResult<TQuery>) => NodeConnection<TNode>
): MaterialTableFetchFunction<TNode> => query =>
    observableQuery
        .refetch({
            ...observableQuery.variables,
            query: mapFromMaterialTableQuery(query)
        } as TVariables)
        .catch(error => {
            console.error(error);
            return observableQuery as ApolloQueryResult<TQuery>;
        })
        .then(getConnection)
        .then(connection => mapNodesToQueryResult(connection, query));
