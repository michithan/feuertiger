import { ApolloServer } from "apollo-server";

import { requireGraphql } from "./utils";
import { TyperesolverDirective } from "./directives";
import { Node, Edge, Connection } from "./types";
import { GetNode } from "./resolver";

const schema = requireGraphql("./schema.graphql");

const server = new ApolloServer({
  typeDefs: schema,
  schemaDirectives: {
    typeresolver: TyperesolverDirective
  },
  resolvers: {
    Query: {
      node: GetNode
    },
    Node: {
      __resolveType: (source: Node, context: any) => {
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
      __resolveType: () => (source: Edge, context: any) => {
        console.log("source: ", source);
        console.log("context: ", context);
      }
    },
    Connection: {
      __resolveType: () => (source: Connection, context: any) => {
        console.log("source: ", source);
        console.log("context: ", context);
      }
    }
  }
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});
