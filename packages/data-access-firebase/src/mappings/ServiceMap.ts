import NodeService, {
    INodeServiceClass,
    INodeService
} from '../services/NodeService';
import ConnectionService, {
    IConnectionServiceClass,
    IConnectionService
} from '../services/ConnectionService';
import PersonsService from '../services/PersonsServices';
import ExercisesService from '../services/ExercisesService';
import { IntrospectionObjectType, IntrospectionSchema } from 'graphql';
import { Firestore } from '@google-cloud/firestore';
import { __schema } from '@feuertiger/schema-graphql/dist/schema.json';

import {
    isConnectionObjectType,
    filterIntrospectionObjectTypes
} from '@feuertiger/utils-graphql';

export enum ResolveType {
    Node,
    Connection
}

export interface IServiceClassMapping {
    service: INodeServiceClass | IConnectionServiceClass;
    type: ResolveType;
}
export interface IServiceClassMap {
    [name: string]: IServiceClassMapping;
}

export interface IServiceMapping {
    service: INodeService | IConnectionService;
    type: ResolveType;
}
export interface IServiceMap {
    [name: string]: IServiceMapping;
}

const ServiceClassMap: IServiceClassMap = {
    ['Node']: { service: NodeService, type: ResolveType.Node },
    ['Connection']: {
        service: ConnectionService,
        type: ResolveType.Connection
    },
    ['Person']: { service: PersonsService, type: ResolveType.Node },
    ['Exercise']: { service: ExercisesService, type: ResolveType.Node }
};

const graphQLSchema = (__schema as unknown) as IntrospectionSchema;
const allTypes: IntrospectionObjectType[] = filterIntrospectionObjectTypes(
    graphQLSchema
);

export const injectServices = (db: Firestore): IServiceMap =>
    allTypes.reduce(
        (serviceMap: IServiceMap, type: IntrospectionObjectType) => {
            const serviceType: ResolveType = isConnectionObjectType(type)
                ? ResolveType.Connection
                : ResolveType.Node;

            let serviceClassMapping = ServiceClassMap[type.name];

            if (!serviceClassMapping) {
                serviceClassMapping =
                    serviceType === ResolveType.Connection
                        ? ServiceClassMap['Connection']
                        : ServiceClassMap['Node'];
            }

            serviceMap[type.name as string] = {
                service: new serviceClassMapping.service(db, type.name),
                type: serviceType
            };

            return serviceMap;
        },
        {}
    );
