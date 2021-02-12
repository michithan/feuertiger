import {
    QueryResolvers,
    Node,
    Person,
    Exercise
} from '@feuertiger/schema-graphql';
import { Department } from '@feuertiger/schema-prisma';
import {
    createConnectionResolver,
    buildPrismaFilter
} from '@feuertiger/pagination';
import { Context } from '../context';
import { parseGlobalId } from '../utils/id';

type NodeResolver = (query: { where: { id: string } }) => Promise<Node>;

export const getNode = async ({
    id,
    context: { db }
}: {
    id: string;
    context: Context;
}): Promise<Node> => {
    const { type } = parseGlobalId(id);
    const resolve = (db[type].findFirst as unknown) as NodeResolver;
    const node = await resolve({
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
        const departmentsConnectionResolver = createConnectionResolver(
            db,
            'department'
        );

        const { search, page, pageSize, orderBy, orderDirection } = query ?? {};
        const searchFilter =
            search && buildPrismaFilter(search, ['name', 'federation']);

        return departmentsConnectionResolver<Department>(query, {
            where: {
                OR: searchFilter || undefined
            },
            orderBy:
                (orderBy &&
                    orderDirection && {
                        [orderBy]: orderDirection
                    }) ||
                undefined,
            take: pageSize,
            skip: page && pageSize && page * pageSize
        });
    },
    persons: (_parent, { query }, { db }) => {
        const personsConnectionResolver = createConnectionResolver(
            db,
            'person'
        );

        const { search, page, pageSize, orderBy, orderDirection } = query ?? {};
        const searchFilter =
            search &&
            buildPrismaFilter(search, [
                'firstname',
                'lastname',
                'phone',
                'birthName',
                'placeOfBirth',
                'avatar',
                'membershipNumber'
            ]);

        return personsConnectionResolver<Person>(query, {
            where: {
                OR: searchFilter || undefined
            },
            orderBy:
                (orderBy &&
                    orderDirection && {
                        [orderBy]: orderDirection
                    }) ||
                undefined,
            take: pageSize,
            skip: page && pageSize && page * pageSize
        });
    },
    exercises: async (_parent, { query }, { db }) => {
        const exercisesConnectionResolver = createConnectionResolver(
            db,
            'exercise'
        );

        const { search, page, pageSize, orderBy, orderDirection } = query ?? {};
        const searchFilter = search && buildPrismaFilter(search, ['topic']);

        return exercisesConnectionResolver<Exercise>(query, {
            where: {
                OR: searchFilter || undefined
            },
            orderBy:
                (orderBy &&
                    orderDirection && {
                        [orderBy]: orderDirection
                    }) ||
                undefined,
            take: pageSize,
            skip: page && pageSize && page * pageSize
        });
    },
    dashboard: async () => ({}),
    membershipRequest: async (
        _parent,
        { id },
        { db, user: { id: userId } }: Context
    ) => {
        const membershipRequest = await db.membershipRequest.findFirst({
            where: {
                AND: [{ id }, { userId }]
            }
        });
        return membershipRequest;
    },
    viewer: (_parent, _, { user }) => user,
    admin: () => ({})
};

export default Query;
