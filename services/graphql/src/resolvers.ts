import { Resolvers, DateTimeResolver } from '@feuertiger/schema-graphql';
import Query from './resolver/query';
import Node from './resolver/node';
import Connection from './resolver/connection';
import Edge from './resolver/edge';
import Mutation from './resolver/mutation';
import Person from './resolver/person';
import Dashboard from './resolver/dashboard';
import Exercise from './resolver/exercise';
import Viewer from './resolver/viewer';
import Department from './resolver/department';
import { Context } from './context';

const resolvers: Resolvers<Context> = {
    DateTime: DateTimeResolver,
    Query,
    Node,
    Connection,
    Edge,
    Mutation,
    Person,
    Dashboard,
    Exercise,
    Department,
    Viewer
};

export default resolvers;
