import { createConnectionFromNodes } from '@feuertiger/pagination';
import { PersonResolvers } from '@feuertiger/schema-graphql';

const Person: PersonResolvers = {
    exercisesLeaded: async ({ id }, args, { db }) => {
        const persons = await db.person.findFirst({
            where: {
                id
            },
            select: {
                exercisesLeaded: true
            }
        });
        return persons?.exercisesLeaded ?? [];
    },
    exercisesParticipated: async ({ id }, args, { db }) => {
        const persons = await db.person.findFirst({
            where: {
                id
            },
            select: {
                exercisesParticipated: true
            }
        });
        return persons?.exercisesParticipated ?? [];
    },
    exercisesNotParticipated: async ({ id }, args, { db }) => {
        const exercises = await db.exercise.findMany({
            where: {
                participants: {
                    none: {
                        id
                    }
                }
            }
        });
        return exercises ?? [];
    },
    address: async ({ id }, args, { db }) => {
        const persons = await db.person.findFirst({
            where: {
                id
            },
            select: {
                address: true
            }
        });
        return persons?.address ?? null;
    },
    departmentMemberships: async ({ id }, _, { db }) => {
        const departmentMemberships = await db.departmentMembership.findMany({
            where: {
                personId: id
            }
        });
        return createConnectionFromNodes(departmentMemberships);
    },
    mainDepartmentMembership: async ({ id }, args, { db }) => {
        const persons = await db.person.findFirst({
            where: {
                id
            },
            select: {
                memberships: {
                    take: 1,
                    orderBy: {
                        entryDate: 'desc'
                    }
                }
            }
        });
        return persons?.memberships?.[0] ?? null;
    },
    grade: async ({ id }, args, { db }) => {
        const promotion = await db.promotion.findMany({
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
    promotions: async ({ id }, args, { db }) => {
        const persons = await db.person.findFirst({
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
