import fs from "fs";
import { gql } from "apollo-server";
import { DocumentNode } from "graphql";

export const requireGraphql = (schemafile: string): DocumentNode =>
  gql(fs.readFileSync(require.resolve(schemafile), "utf8"));
