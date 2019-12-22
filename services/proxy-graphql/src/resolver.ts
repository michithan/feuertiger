import { IResolvers } from 'apollo-server';
import { ServiceAccount } from 'firebase-admin';
import { Node } from '@feuertiger/schema-graphql';
import {
    initDb,
    seed,
    injectServices,
    IServiceMap,
    createResolvers
} from '@feuertiger/data-access-firebase';
import { ParseId } from '@feuertiger/utils-graphql';
import { getFirebaseAdminSecrets } from '@feuertiger/tools';

console.log('getFirebaseAdminSecrets()', getFirebaseAdminSecrets());
const db = initDb(getFirebaseAdminSecrets() as ServiceAccount);
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

export default {
    ...typeResolvers,
    ...resolvers
};
