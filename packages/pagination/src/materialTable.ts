/* eslint-disable @typescript-eslint/ban-types */
import type {
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

export type MaterialTableFetchFunction<RowData extends object> = (
    query: Query<RowData>
) => Promise<MaterialTableQueryResult<RowData>>;

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
            column: column?.field,
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

export const mapFromMaterialTableQuery = <RowData extends object>({
    page,
    pageSize,
    filters,
    orderBy,
    orderDirection,
    search
}: Query<RowData>): _Query => {
    return {
        page,
        pageSize,
        filters: buildFilters(filters),
        orderBy: typeof orderBy?.field === 'string' ? orderBy.field : undefined,
        orderDirection: orderDirection?.toUpperCase() || 'ASC',
        search: search || undefined
    };
};

interface WithQuery {
    query: _Query;
}

export const createMaterialTableFetchFunction = <
    Query extends object,
    RowData extends object,
    Variables extends WithQuery = OperationVariables & WithQuery
>(
    observableQuery: QueryResult<Query, Variables>,
    mapResultToRowData: (result: ApolloQueryResult<Query>) => RowData[]
): MaterialTableFetchFunction<RowData> => async query => {
    console.log('doing the fetch');

    let result: ApolloQueryResult<Query>;

    try {
        result = await observableQuery.refetch({
            ...observableQuery.variables,
            query: mapFromMaterialTableQuery(query)
        } as Variables);
    } catch (error) {
        result = observableQuery as ApolloQueryResult<Query>;
        console.error(error);
    }

    const rows = mapResultToRowData(result).map(row => ({ ...row }));

    return {
        data: rows,
        page: query.page,
        totalCount: rows.length
    };
};
