import { Resolvers, DateTimeResolver } from '@feuertiger/schema-graphql';
import Query from './resolver/query';
import Node from './resolver/node';
import Connection from './resolver/connection';
import Edge from './resolver/edge';
import Mutation from './resolver/mutation';
import Person from './resolver/person';
import Dashboard from './resolver/dashboard';
import Exercise from './resolver/exercise';
import User from './resolver/user';
import Department from './resolver/department';
import MembershipRequest from './resolver/membershipRequest';
import DepartmentMembership from './resolver/departmentMembership';
import Admin from './resolver/admin';
import AdminMutation from './resolver/adminMutation';
import { Context } from './context';

const resolvers: Resolvers<Context> = {
    DateTime: DateTimeResolver,
    Query,
    Node,
    Admin,
    AdminMutation,
    Connection,
    Edge,
    Mutation,
    Person,
    Dashboard,
    Exercise,
    Department,
    DepartmentMembership,
    MembershipRequest,
    User
};

export default resolvers;
