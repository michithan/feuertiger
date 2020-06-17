import { PersonResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';

const Person: PersonResolvers = {
    exercisesLeaded: async (parent, args, context: Context) => {
        const { id } = parent;
        if (id) {
            const persons = await context.db.person.findOne({
                where: {
                    id
                },
                select: {
                    exercisesLeaded: true
                }
            });
            return persons?.exercisesLeaded ?? [];
        }
        return [];
    }
    // exercisesParticipatedasync: async (
    //     parent: Person,
    //     args,
    //     context: Context
    // ) => {
    //     const { id } = parent;
    //     if (id) {
    //         const persons = await context.db.person.findOne({
    //             where: {
    //                 id
    //             },
    //             select: {
    //                 exercisesParticipated: true
    //             }
    //         });
    //         return persons?.exercisesParticipated ?? [];
    //     }
    //     return [];
    // },
    // adress: async (parent, args, context: Context) => {
    //     const { id } = parent;
    //     if (id) {
    //         const persons = await context.db.person.findOne({
    //             where: {
    //                 id
    //             },
    //             select: {
    //                 address: true
    //             }
    //         });
    //         return persons?.address;
    //     }
    // }
};

export default Person;
