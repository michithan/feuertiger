/* eslint-disable @typescript-eslint/naming-convention */
import { ConnectionResolvers } from '@feuertiger/schema-graphql';

const Connection: ConnectionResolvers = {
    __resolveType: parent => {
        const { __typename } = parent;
        return __typename as ReturnType<ConnectionResolvers['__resolveType']>;
    }
};

export default Connection;
