import { QueryResolvers, Node, _Query } from '@feuertiger/schema-graphql';
import { Context } from '../context';
import { parseGlobalId } from '../utils/id';
import { buildQuery } from '../utils/query';

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
    allPersons: async (parent, { query }, { db }: Context) => {
        if (!query) {
            return db.person.findMany();
        }
        const searchPropertys = [
            'firstname',
            'lastname',
            'phone',
            'birthName',
            'placeOfBirth',
            'avatar',
            'dateOfBirth',
            'membershipNumber'
        ];
        const args = buildQuery(query, searchPropertys);
        return db.person.findMany(args);
    },
    allExercises: async (parent, args, context: Context) => {
        const exercises = await context.db.exercise.findMany();
        return exercises;
    },
    dashboard: async () => ({})
};

export default Query;
