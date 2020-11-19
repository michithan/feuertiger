import '@feuertiger/native-js-extensions';
import { EdgeResolvers } from '@feuertiger/schema-graphql';
import { parseGlobalId } from '../utils/id';

const Edge: EdgeResolvers = {
    __resolveType: parent => {
        const {
            node: { id }
        } = parent;
        const { type } = parseGlobalId(id);
        return `${type.toPascalCase()}Edge` as ReturnType<
            EdgeResolvers['__resolveType']
        >;
    }
};

export default Edge;
