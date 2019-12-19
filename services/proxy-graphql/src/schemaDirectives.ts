import { SchemaDirectiveVisitor } from 'apollo-server';

class TyperesolverDirective extends SchemaDirectiveVisitor {
    public visitObject(object: any) {
        console.log('object: ', object);
    }
    public visitInterface(inter: any) {
        console.log('interface: ', inter);
    }
}

export default {
    typeresolver: TyperesolverDirective
};
