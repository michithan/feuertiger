import { NodeResolvers } from '@feuertiger/schema-graphql';
import { parseGlobalId, toPascalCase } from '../utils/id';

const Node: NodeResolvers = {
    __resolveType: parent => {
        const { id } = parent;
        const { type } = parseGlobalId(id);
        return toPascalCase(type) as ReturnType<NodeResolvers['__resolveType']>;
    }
};

export default Node;
