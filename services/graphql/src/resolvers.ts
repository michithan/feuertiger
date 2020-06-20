import { Resolvers, DateTimeResolver } from '@feuertiger/schema-graphql';
import Query from './resolver/query';
import Node from './resolver/node';
import Mutation from './resolver/mutation';
import Person from './resolver/person';
import Dashboard from './resolver/dashboard';

const resolvers: Resolvers = {
    DateTime: DateTimeResolver,
    Query,
    Node,
    Mutation,
    Person,
    Dashboard
};

export default resolvers;
