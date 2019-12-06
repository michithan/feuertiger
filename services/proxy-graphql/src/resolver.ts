import { GraphQLResolveInfo, GraphQLAbstractType } from "graphql";
import { IResolvers } from "apollo-server";
import { ServiceAccount } from "firebase-admin";
import { __schema } from "@feuertiger/schema-graphql/dist/schema.json";
import { Node, Edge, Connection } from "@feuertiger/schema-graphql";
import {
  initDb,
  seed,
  injectServices,
  IServiceMap,
  createResolvers
} from "@feuertiger/data-access-firebase";

import { firebase as secrets } from "../../../secrets.json";

const db = initDb(secrets as ServiceAccount);
seed(db);

const serviceMap: IServiceMap = injectServices(db);
const resolvers: IResolvers = createResolvers(serviceMap);

const typeResolvers: IResolvers = {
  Node: {
    __resolveType: (
      source: Node,
      context: any,
      info: GraphQLResolveInfo,
      abstractType: GraphQLAbstractType
    ) => {
      const { id } = source;
      const type = id.split(":").shift();

      console.log("source: ", source);
      console.log("context: ", context);

      if (!type) {
        throw Error(`invalid globalid: ${id}`);
      }

      return type;
    }
  },
  Edge: {
    __resolveType: () => (
      source: Edge,
      context: any,
      info: GraphQLResolveInfo,
      abstractType: GraphQLAbstractType
    ) => {
      console.log("source: ", source);
      console.log("context: ", context);

      return "Edge";
    }
  },
  Connection: {
    __resolveType: () => (
      source: Connection,
      context: any,
      info: GraphQLResolveInfo,
      abstractType: GraphQLAbstractType
    ) => {
      console.log("source: ", source);
      console.log("context: ", context);

      return "Connection";
    }
  }
};

export default {
  ...typeResolvers,
  ...resolvers
};
