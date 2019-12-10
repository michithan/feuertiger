import {
    IntrospectionSchema,
    IntrospectionObjectType,
    IntrospectionField
} from 'graphql';
import { IResolvers, IResolverObject, IFieldResolver } from 'apollo-server';

import {
    filterIntrospectionObjectTypes,
    isConnectionObjectType
} from '@feuertiger/utils-graphql';
import { __schema } from '@feuertiger/schema-graphql/dist/schema.json';

import { ResolveType, IServiceMap } from './ServiceMap';
import { resolveObjectResolver, resolveListResolver } from './ServiceResolver';
import { IConnectionService } from '../services/ConnectionService';
import { INodeService } from '../services/NodeService';

export interface FieldObjectTuple {
    field: IntrospectionField;
    fieldObject: IntrospectionObjectType;
}

export interface FieldObjectMapping {
    field: IntrospectionField;
    fieldObject: IntrospectionObjectType;
    parentObject: IntrospectionObjectType;
    type: ResolveType;
}

const graphQLSchema = (__schema as unknown) as IntrospectionSchema;
const allTypes: IntrospectionObjectType[] = filterIntrospectionObjectTypes(
    graphQLSchema
);

const nameOfFieldType = (field: any) => {
    const { type } = field;
    const { ofType } = type || {};
    const name = type.name || (ofType && ofType.name);
    return name;
};

const mapFieldsToObjectType = (
    fields: readonly IntrospectionField[]
): Array<FieldObjectTuple> =>
    fields
        .map((field: IntrospectionField) => {
            const typeName = nameOfFieldType(field);
            return {
                field,
                fieldObject: allTypes.find(
                    object => object.name === typeName
                ) as IntrospectionObjectType
            };
        })
        .filter(({ fieldObject }) => !!fieldObject);

const fieldObjectMap: Array<FieldObjectMapping> = allTypes.reduce(
    (
        fieldObjectMappings: Array<FieldObjectMapping>,
        object: IntrospectionObjectType
    ): Array<FieldObjectMapping> => {
        const fieldTuples: Array<FieldObjectTuple> = mapFieldsToObjectType(
            object.fields
        );
        for (const fieldTuple of fieldTuples) {
            const { field, fieldObject } = fieldTuple;
            const type = isConnectionObjectType(fieldObject)
                ? ResolveType.Connection
                : ResolveType.Node;

            fieldObjectMappings.push({
                field,
                fieldObject,
                parentObject: object,
                type
            });
        }

        return fieldObjectMappings;
    },
    []
);

export const createResolvers = (serviceMap: IServiceMap): IResolvers =>
    fieldObjectMap.reduce<IResolvers>(
        (
            resolvers: IResolvers,
            fieldObjectMapping: FieldObjectMapping
        ): IResolvers => {
            const { service, type: serviceType } = serviceMap[
                fieldObjectMapping.fieldObject.name
            ];

            const {
                field,
                fieldObject,
                parentObject,
                type: fieldType
            } = fieldObjectMapping;

            if (fieldType !== serviceType) {
                throw 'internal Resolver-Service mapping exception!';
            }

            const objectName = parentObject.name;
            const fieldName = field.name;

            const resolverObject = (resolvers[objectName] ||
                {}) as IResolverObject;

            if (serviceType === ResolveType.Connection) {
                resolverObject[fieldName] = resolveListResolver(
                    field,
                    fieldObject,
                    parentObject,
                    service as IConnectionService
                );
            } else {
                resolverObject[fieldName] = resolveObjectResolver(
                    field,
                    fieldObject,
                    parentObject,
                    service as INodeService
                );
            }

            resolvers[objectName] = resolverObject;

            return resolvers;
        },
        {}
    );
