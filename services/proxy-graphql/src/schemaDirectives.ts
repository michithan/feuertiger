import { SchemaDirectiveVisitor } from 'apollo-server';

class TyperesolverDirective extends SchemaDirectiveVisitor {
    // eslint-disable-next-line class-methods-use-this
    public visitObject(object: any) {
        // eslint-disable-next-line no-console
        console.log('object: ', object);
    }

    // eslint-disable-next-line class-methods-use-this
    public visitInterface(inter: any) {
        // eslint-disable-next-line no-console
        console.log('interface: ', inter);
    }
}

export default {
    typeresolver: TyperesolverDirective
};
