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
import { createWorker } from 'tesseract.js';

export default () => {
    const db = initDb();
    seed(db);

    const customResolvers: IResolvers = {
        Query: {
            ocr: async (parent, args) => {
                const { image } = args;

                const worker = createWorker();
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                const { data } = await worker.recognize(image);
                await worker.terminate();
                const { text } = data;
                return text;
            }
        }
    };

    const serviceMap: IServiceMap = injectServices(db);
    const resolvers: IResolvers = {
        ...createResolvers(serviceMap),
        ...customResolvers
    };

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
