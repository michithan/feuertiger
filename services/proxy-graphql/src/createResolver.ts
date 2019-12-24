import { IResolvers } from 'apollo-server';
import merge from 'lodash.merge';
import { Node } from '@feuertiger/schema-graphql';
import {
    initDb,
    seed,
    injectServices,
    IServiceMap,
    createResolvers
} from '@feuertiger/data-access-firebase';
import { ParseId } from '@feuertiger/utils-graphql';
import { ocr } from '@feuertiger/ocr';

export default () => {
    const db = initDb();
    seed(db);

    const customResolvers: IResolvers = {
        Query: {
            ocr: async (parent, args) => {
                const { image } = args;
                const text = await ocr(image);
                return text;
            }
        }
    };

    const serviceMap: IServiceMap = injectServices(db);
    const resolvers: IResolvers = merge(
        createResolvers(serviceMap),
        customResolvers
    );

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
