import { MutationResolvers, Person } from '@feuertiger/schema-graphql';
import { PersonCreateInput } from '@feuertiger/schema-prisma';
import { Context } from '../context';
import { mapInput, parseGlobalId } from '../utils/id';

export const deleteNode = ({
    id,
    context
}: {
    id: string;
    context: Context;
}): Promise<boolean> | boolean => {
    const { type } = parseGlobalId(id);
    // @ts-ignore
    const resolver = context.db[type];
    return resolver ? resolver({ id }) : false;
};

const Mutation: MutationResolvers = {
    delete: (_parent, { id }, context) => deleteNode({ id, context }),
    createPerson: async (_parent, args, context: Context) => {
        const data = mapInput<PersonCreateInput>(args.person, {
            connections: ['exercisesParticipated', 'exercisesLeaded']
        });
        const created = await context.db.person.create({ data });
        return created;
    },
    updatePerson: async (_parent, { person }, context: Context) => {
        const { id, address } = person;
        const update: Person = await context.db.person.update({
            where: {
                id
            },
            data: {
                firstname: person.firstname ?? undefined,
                lastname: person.lastname ?? undefined,
                sex: person.sex ?? undefined,
                placeOfBirth: person.placeOfBirth ?? undefined,
                birthName: person.birthName ?? undefined,
                avatar: person.avatar ?? undefined,
                dateOfBirth: person.dateOfBirth ?? undefined
            }
        });
        if (address) {
            update.address = await context.db.address.update({
                where: {
                    id: address.id
                },
                data: {
                    city: address.city ?? undefined,
                    country: address.country ?? undefined,
                    postalCode: address.postalCode ?? undefined,
                    street: address.street ?? undefined,
                    streetNumber: address.streetNumber ?? undefined
                }
            });
        }
        return update || null;
    },
    addExerciseToPerson: async (_parent, args, context: Context) => {
        const { personId, exerciseId } = args;
        const update = await context.db.person.update({
            where: {
                id: personId
            },
            data: {
                exercisesParticipated: {
                    connect: { id: exerciseId }
                }
            }
        });
        return !!update;
    },
    removeExerciseFromPerson: async (_parent, args, context: Context) => {
        const { personId, exerciseId } = args;
        const update = await context.db.person.update({
            where: {
                id: personId
            },
            data: {
                exercisesParticipated: {
                    disconnect: { id: exerciseId }
                }
            }
        });
        return !!update;
    }
};

export default Mutation;
