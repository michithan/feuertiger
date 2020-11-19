import '@feuertiger/native-js-extensions';
import { NodeResolvers } from '@feuertiger/schema-graphql';
import { parseGlobalId } from '../utils/id';

const Node: NodeResolvers = {
    __resolveType: parent => {
        const { id } = parent;
        const { type } = parseGlobalId(id);
        return type.toPascalCase() as ReturnType<
            NodeResolvers['__resolveType']
        >;
    }
};

export default Node;
