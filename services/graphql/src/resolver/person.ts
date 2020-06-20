import { PersonResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';

const Person: PersonResolvers = {
    exercisesLeaded: async ({ id }, args, context: Context) => {
        const persons = await context.db.person.findOne({
            where: {
                id
            },
            select: {
                exercisesLeaded: true
            }
        });
        return persons?.exercisesLeaded ?? [];
    },
    exercisesParticipated: async ({ id }, args, context: Context) => {
        const persons = await context.db.person.findOne({
            where: {
                id
            },
            select: {
                exercisesParticipated: true
            }
        });
        return persons?.exercisesParticipated ?? [];
    },
    address: async ({ id }, args, context: Context) => {
        const persons = await context.db.person.findOne({
            where: {
                id
            },
            select: {
                address: true
            }
        });
        return persons?.address ?? null;
    },
    memberships: async ({ id }, args, context: Context) => {
        const persons = await context.db.person.findOne({
            where: {
                id
            },
            select: {
                memberships: true
            }
        });
        return persons?.memberships ?? [];
    },
    grade: async ({ id }, args, context: Context) => {
        const promotion = await context.db.promotion.findMany({
            where: {
                personId: id
            },
            orderBy: {
                dateOfPromotion: 'desc'
            },
            take: 1,
            select: {
                grade: true
            }
        });
        return promotion?.[0]?.grade ?? null;
    },
    promotions: async ({ id }, args, context: Context) => {
        const persons = await context.db.person.findOne({
            where: {
                id
            },
            select: {
                promotions: true
            }
        });
        return persons?.promotions ?? [];
    }
};

export default Person;
