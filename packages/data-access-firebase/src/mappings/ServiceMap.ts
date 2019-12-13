import { IntrospectionOutputType, IntrospectionSchema } from 'graphql';
import { Firestore } from '@google-cloud/firestore';
import { __schema } from '@feuertiger/schema-graphql/dist/schema.json';

import { filterIntrospectionObjectTypes } from '@feuertiger/utils-graphql';
import ExercisesService from '../services/ExercisesService';
import PersonsService from '../services/PersonsServices';
import NodeService, {
    INodeServiceClass,
    INodeService
} from '../services/NodeService';

export interface IServiceClassMap {
    [name: string]: INodeServiceClass;
}

export interface IServiceMap {
    [name: string]: INodeService;
}

const ServiceClassMap: IServiceClassMap = {
    Node: NodeService,
    Person: PersonsService,
    Exercise: ExercisesService
};

const graphQLSchema = (__schema as unknown) as IntrospectionSchema;
const allTypes: IntrospectionOutputType[] = filterIntrospectionObjectTypes(
    graphQLSchema
);

export const injectServices = (db: Firestore): IServiceMap =>
    allTypes.reduce(
        (serviceMap: IServiceMap, type: IntrospectionOutputType) => {
            const Service = ServiceClassMap[type.name] || ServiceClassMap.Node;
            serviceMap[type.name as string] = new Service(db, type.name);
            return serviceMap;
        },
        {}
    );
