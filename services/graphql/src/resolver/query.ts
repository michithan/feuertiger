import { QueryResolvers, Node } from '@feuertiger/schema-graphql';
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
    allPersons: async (parent, args, context: Context) => {
        const persons = await context.db.person.findMany();
        return persons;
    },
    allExercises: async (parent, args, context: Context) => {
        const exercises = await context.db.exercise.findMany();
        return exercises;
    },
    dashboard: async () => ({})
};

export default Query;
