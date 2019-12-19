import {
    IntrospectionOutputType,
    GraphQLResolveInfo,
    IntrospectionField
} from 'graphql';
import { MergeInfo } from 'apollo-server';

import { Node, Connection } from '@feuertiger/schema-graphql';
import { __schema } from '@feuertiger/schema-graphql/dist/schema.json';

import { INodeService } from '../services/NodeService';

export const resolveObjectResolver = (
    field: IntrospectionField,
    parentObject: IntrospectionOutputType,
    fieldObject: IntrospectionOutputType,
    service: INodeService
) => async (
    parent: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo & {
        mergeInfo: MergeInfo;
    }
): Promise<Node> => {
    const { id } = args || parent[field.name];
    return await service.GetById(id);
};

export const resolveListResolver = (
    field: IntrospectionField,
    parentObject: IntrospectionOutputType,
    fieldObject: IntrospectionOutputType,
    service: INodeService
) => async (
    parent: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo & {
        mergeInfo: MergeInfo;
    }
): Promise<Connection> => {
    const { id } = parent;
    return await service.GetEdgesById(id, field.name);
};
