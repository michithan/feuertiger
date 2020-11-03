/* eslint-disable @typescript-eslint/ban-types */
import type {
    FilterOperator,
    _Query,
    _QueryFilter
} from '@feuertiger/schema-graphql';
import type { Filter, Query, QueryResult } from 'material-table';
import type { ObservableQuery, OperationVariables } from '@apollo/client';

export type MaterialTableFetchFunction<RowData extends object> = (
    query: Query<RowData>
) => Promise<QueryResult<RowData>>;

declare global {
    interface String {
        toUpperCase(this: 'asc' | 'desc'): 'ASC' | 'DESC';
    }
}

const mapOperator = <RowData extends object>(
    operator: Filter<RowData>['operator']
): FilterOperator | undefined => {
    switch (operator) {
        case '=':
            return 'Equals';
        default:
            return undefined;
    }
};

const buildFilters = <RowData extends object>(
    queryFilter: Query<RowData>['filters']
): _Query['filters'] | undefined =>
    queryFilter
        .map(({ value, operator, column }) => ({
            column: column.field,
            operator: mapOperator(operator),
            value
        }))
        .filter(
            <
                (filter: {
                    column: string | keyof RowData | undefined;
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

export const mapFromMaterialTableQuery = <RowData extends object>(
    query: Query<RowData>
): _Query => {
    return {
        page: query.page,
        pageSize: query.pageSize,
        filters: buildFilters(query.filters),
        orderBy:
            typeof query.orderBy.field === 'string'
                ? query.orderBy.field
                : undefined,
        orderDirection: query.orderDirection.toUpperCase() ?? 'ASC',
        search: query.search
    };
};

interface WithQuery {
    query: _Query;
}

export const createMaterialTableFetchFunction = <
    RowData extends object,
    Variables extends WithQuery = OperationVariables & WithQuery
>(
    observableQuery: ObservableQuery<Array<RowData>, Variables>
): MaterialTableFetchFunction<RowData> => async query =>
    observableQuery
        .refetch({
            ...observableQuery.variables,
            query: mapFromMaterialTableQuery(query)
        } as Variables)
        .then(({ data }) => ({
            data,
            page: query.page,
            totalCount: data.length
        }));
