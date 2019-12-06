import { Node, Edge, Connection } from "./types";

export function GetNode(parent: any, args: any, context: any, info: any): Node {
  console.log("parent: ", parent);
  console.log("args: ", args);
  console.log("context: ", context);
  console.log("info: ", info);

  const { id } = args;

  return {
    id
  };
}
