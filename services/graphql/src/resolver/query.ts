import {
    QueryResolvers,
    Node,
    Person,
    Exercise
} from '@feuertiger/schema-graphql';
import { Department } from '@feuertiger/schema-prisma';
import {
    mapToPrismaQuery,
    createConnectionResolver
} from '@feuertiger/pagination';
import { Context } from '../context';
import { parseGlobalId } from '../utils/id';

interface NodeResolver {
    findOne: (query: { where: { id: string } }) => Promise<Node>;
}

export const getNode = async ({
    id,
    context
}: {
    id: string;
    context: Context;
}): Promise<Node> => {
    const { type } = parseGlobalId(id);
    const resolver = ((context?.db as unknown) as Record<
        string,
        NodeResolver
    >)?.[type];
    const node = await resolver.findOne({
        where: {
            id
        }
    });
    return node as Node;
};

const Query: QueryResolvers<Context> = {
    node: (_parent, { id }, context) => getNode({ id, context }),
    nodes: (_parent, args, context) =>
        Promise.all(args.ids.map(id => getNode({ id, context }))),
    department: (_parent, { id }, context) => getNode({ id, context }),
    departments: (_parent, { query }, { db }) => {
        const departmentsConnectionResolver = createConnectionResolver<Department>(
            db,
            db.department.count,
            db.department.findMany
        );
        const searchProperties = ['name', 'federation'];
        const args = mapToPrismaQuery(query, searchProperties);
        return departmentsConnectionResolver(query, args);
    },
    persons: (_parent, { query }, { db }) => {
        const personsConnectionResolver = createConnectionResolver<Person>(
            db,
            db.person.count,
            db.person.findMany
        );
        const searchProperties = [
            'firstname',
            'lastname',
            'phone',
            'birthName',
            'placeOfBirth',
            'avatar',
            'membershipNumber'
        ];
        const args = mapToPrismaQuery(query, searchProperties);
        return personsConnectionResolver(query, args);
    },
    exercises: async (_parent, { query }, { db }) => {
        const exercisesConnectionResolver = createConnectionResolver<Exercise>(
            db,
            db.exercise.count,
            db.exercise.findMany
        );
        const searchProperties = ['topic'];
        const args = mapToPrismaQuery(query, searchProperties);
        return exercisesConnectionResolver(query, args);
    },
    dashboard: async () => ({}),
    membershipRequest: async (
        _parent,
        { id },
        { db, viewer: { id: userId } }: Context
    ) => {
        const membershipRequest = await db.membershipRequest.findFirst({
            where: {
                AND: [{ id }, { userId }]
            }
        });
        return membershipRequest;
    },
    viewer: (_parent, _, { viewer }) => viewer
};

export default Query;
