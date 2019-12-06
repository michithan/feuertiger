import { SchemaDirectiveVisitor } from "apollo-server";

export default class TyperesolverDirective extends SchemaDirectiveVisitor {
  public visitObject(object: any) {
    console.log("object: ", object);
  }
  public visitInterface(inter: any) {
    console.log("interface: ", inter);
  }
}
