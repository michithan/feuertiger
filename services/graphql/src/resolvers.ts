import { Resolvers } from '@feuertiger/schema-graphql';
import Query from './resolver/query';
import Node from './resolver/node';
import Mutation from './resolver/mutation';
import Person from './resolver/person';

const resolvers: Resolvers = {
    Query,
    Node,
    Mutation,
    Person
};

export default resolvers;
