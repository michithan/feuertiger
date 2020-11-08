import { Resolvers, DateTimeResolver } from '@feuertiger/schema-graphql';
import Query from './resolver/query';
import Node from './resolver/node';
import Connection from './resolver/connection';
import Edge from './resolver/edge';
import Mutation from './resolver/mutation';
import Person from './resolver/person';
import Dashboard from './resolver/dashboard';
import Exercise from './resolver/exercise';

const resolvers: Resolvers = {
    DateTime: DateTimeResolver,
    Query,
    Node,
    Connection,
    Edge,
    Mutation,
    Person,
    Dashboard,
    Exercise
};

export default resolvers;
