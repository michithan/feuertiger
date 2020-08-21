import { NodeResolvers } from '@feuertiger/schema-graphql';
import { parseGlobalId } from '../utils/id';

const Node: NodeResolvers = {
    __resolveType: parent => {
        const { id } = parent;
        const { type } = parseGlobalId(id);
        return [type[0].toUpperCase(), ...type.slice(1)].join('') as any;
    }
};

export default Node;
