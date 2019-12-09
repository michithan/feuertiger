import {
  IntrospectionObjectType,
  GraphQLResolveInfo,
  IntrospectionField
} from "graphql";
import { MergeInfo } from "apollo-server";

import { Node, Connection } from "@feuertiger/schema-graphql";
import { __schema } from "@feuertiger/schema-graphql/dist/schema.json";

import { INodeService } from "../services/NodeService";
import { IConnectionService } from "../services/ConnectionService";

export const resolveObjectResolver = (
  field: IntrospectionField,
  parentObject: IntrospectionObjectType,
  fieldObject: IntrospectionObjectType,
  service: INodeService
) => async (
  source: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo & {
    mergeInfo: MergeInfo;
  }
): Promise<Node> => {
  const id = args.id || source[field.name];

  console.log("id: ", id);

  return await service.GetById(id);
};

export const resolveListResolver = (
  field: IntrospectionField,
  parentObject: IntrospectionObjectType,
  fieldObject: IntrospectionObjectType,
  service: IConnectionService
) => (
  source: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo & {
    mergeInfo: MergeInfo;
  }
): Connection => {
  console.log("source: ", source);

  return {
    pageInfo: {
      hasNextPage: false
    },
    edges: []
  };
};
