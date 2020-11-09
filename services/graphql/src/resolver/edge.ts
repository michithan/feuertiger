import { EdgeResolvers } from '@feuertiger/schema-graphql';
import { parseGlobalId, toPascalCase } from '../utils/id';

const Edge: EdgeResolvers = {
    __resolveType: parent => {
        const {
            node: { id }
        } = parent;
        const { type } = parseGlobalId(id);
        return `${toPascalCase(type)}Edge` as ReturnType<
            EdgeResolvers['__resolveType']
        >;
    }
};

export default Edge;
