import {
    MutationResolvers,
    Person,
    PersonUpdate,
    _MembershipRequest,
    _Node
} from '@feuertiger/schema-graphql';
import { Prisma } from '@feuertiger/schema-prisma';
import { Context } from '../context';
import { createGlobalId, mapInput, parseGlobalId } from '../utils/id';

export const deleteNode = ({
    id,
    context
}: {
    id: string;
    context: Context;
}): Promise<boolean> | boolean => {
    const { type } = parseGlobalId(id);
    const resolver = ((context.db as unknown) as Record<string, unknown>)[
        type
    ] as (node: _Node) => Promise<boolean> | boolean;
    return resolver ? resolver({ id }) : false;
};

const Mutation: MutationResolvers = {
    delete: (_parent, { id }, context) => deleteNode({ id, context }),
    createPerson: async (_parent, args, context: Context) => {
        const { id, ...data } = mapInput<
            PersonUpdate,
            Prisma.PersonCreateInput
        >(args.person, {
            connections: ['exercisesParticipated', 'exercisesLeaded']
        });
        const created = await context.db.person.create({
            data: { id: id ?? createGlobalId('person'), ...data }
        });
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
    updatePersonExercisesConnection: async (
        _parent,
        args,
        context: Context
    ) => {
        const { update } = args;
        const { id: personId, changes } = update;

        const connect = changes
            .filter(({ action }) => action === 'ADD')
            .map(({ id }) => ({ id }));

        const disconnect = changes
            .filter(({ action }) => action === 'DELETE')
            .map(({ id }) => ({ id }));

        const data: Prisma.PersonUpdateInput = {
            exercisesParticipated: {}
        };

        if (data.exercisesParticipated && connect.length <= 0) {
            data.exercisesParticipated.connect = connect;
        }

        if (data.exercisesParticipated && disconnect.length <= 0) {
            data.exercisesParticipated.disconnect = disconnect;
        }

        const personUpdate = await context.db.person.update({
            where: {
                id: personId
            },
            data
        });

        return personUpdate;
    },
    createMembershipRequest: async (
        _parent,
        { membershipRequest },
        { db, viewer }: Context
    ) => {
        const created = await db.membershipRequest.create({
            data: {
                id: createGlobalId('membershipRequest'),
                user: {
                    connect: {
                        id: membershipRequest?.userId ?? viewer.id
                    }
                },
                department: {
                    connect: {
                        id: membershipRequest?.departmentId
                    }
                }
            }
        });
        return created;
    }
};

export default Mutation;
