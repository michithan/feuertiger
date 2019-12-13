import {
    IntrospectionSchema,
    IntrospectionObjectType,
    IntrospectionInterfaceType,
    IntrospectionField
} from 'graphql';
import { IResolvers, IResolverObject, IFieldResolver } from 'apollo-server';

import {
    filterIntrospectionObjectTypes,
    isConnectionObjectType,
    isNodeObjectType,
    isIntrospectionQueryObjectType
} from '@feuertiger/utils-graphql';
import { __schema } from '@feuertiger/schema-graphql/dist/schema.json';

import { IServiceMap } from './ServiceMap';
import { resolveObjectResolver, resolveListResolver } from './ServiceResolver';

export enum ResolveType {
    Node,
    Connection
}

export interface FieldObjectTuple {
    field: IntrospectionField;
    fieldObject: IntrospectionObjectType;
}

export interface FieldObjectMapping {
    field: IntrospectionField;
    fieldObject: ResolveableOutputType;
    parentObject: ResolveableOutputType;
    type: ResolveType;
}

export type ResolveableOutputType =
    | IntrospectionObjectType
    | IntrospectionInterfaceType;

const graphQLSchema = (__schema as unknown) as IntrospectionSchema;
const allTypes: ResolveableOutputType[] = filterIntrospectionObjectTypes(
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

const fieldObjectMap: Array<FieldObjectMapping> = [
    ...allTypes.filter(isNodeObjectType),
    ...allTypes.filter(isIntrospectionQueryObjectType)
].reduce(
    (
        fieldObjectMappings: Array<FieldObjectMapping>,
        object: ResolveableOutputType
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
            const {
                field,
                fieldObject,
                parentObject,
                type
            } = fieldObjectMapping;

            const objectName = parentObject.name;
            const fieldName = field.name;

            const resolverObject = (resolvers[objectName] ||
                {}) as IResolverObject;

            if (type === ResolveType.Connection) {
                const service =
                    serviceMap[fieldObjectMapping.parentObject.name];
                resolverObject[fieldName] = resolveListResolver(
                    field,
                    fieldObject,
                    parentObject,
                    service
                );
            } else {
                const service = serviceMap[fieldObjectMapping.fieldObject.name];
                resolverObject[fieldName] = resolveObjectResolver(
                    field,
                    fieldObject,
                    parentObject,
                    service
                );
            }

            resolvers[objectName] = resolverObject;

            return resolvers;
        },
        {}
    );
