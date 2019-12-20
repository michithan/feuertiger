import { IntrospectionOutputType, IntrospectionField } from 'graphql';

import { Node, Connection } from '@feuertiger/schema-graphql/dist/index';

import { INodeService } from '../services/NodeService';

export const resolveObjectResolver = (
    field: IntrospectionField,
    parentObject: IntrospectionOutputType,
    fieldObject: IntrospectionOutputType,
    service: INodeService
) => async (parent: any, args: any): Promise<Node> => {
    const { id } = args || parent[field.name];
    return service.GetById(id);
};

export const resolveListResolver = (
    field: IntrospectionField,
    parentObject: IntrospectionOutputType,
    fieldObject: IntrospectionOutputType,
    service: INodeService
) => async (parent: any): Promise<Connection> => {
    const { id } = parent;
    return service.GetEdgesById(id, field.name);
};
