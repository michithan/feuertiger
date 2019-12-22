import { IResolvers } from 'apollo-server';
import { Node } from '@feuertiger/schema-graphql';
import {
    initDb,
    seed,
    injectServices,
    IServiceMap,
    createResolvers
} from '@feuertiger/data-access-firebase';
import { ParseId } from '@feuertiger/utils-graphql';

export default () => {
    const db = initDb();
    seed(db);

    const serviceMap: IServiceMap = injectServices(db);
    const resolvers: IResolvers = createResolvers(serviceMap);

    const typeResolvers: IResolvers = {
        Node: {
            __resolveType: (source: Node) => {
                const { id } = source;
                const { type } = ParseId(id);
                return type;
            }
        },
        Edge: {
            __resolveType: () => () => 'Edge'
        },
        Connection: {
            __resolveType: () => () => 'Connection'
        }
    };

    return {
        ...typeResolvers,
        ...resolvers
    };
};
