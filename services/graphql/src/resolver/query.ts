import {
    QueryResolvers,
    Node,
    Person,
    Exercise
} from '@feuertiger/schema-graphql';
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

const Query: QueryResolvers = {
    node: (_parent, { id }, context) => getNode({ id, context }),
    nodes: (_parent, args, context) =>
        Promise.all(args.ids.map(id => getNode({ id, context }))),
    department: (_parent, { id }, context) => getNode({ id, context }),
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
    dashboard: async () => ({})
};

export default Query;
