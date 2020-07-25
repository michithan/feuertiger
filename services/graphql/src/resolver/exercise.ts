import { ExerciseResolvers } from '@feuertiger/schema-graphql';
import { Context } from '../context';

const Exercise: ExerciseResolvers = {
    timeslot: async ({ id }, args, context: Context) => {
        const [{ timeslot }] = await context.db.exercise.findMany({
            where: {
                id
            },
            select: {
                timeslot: true
            }
        });
        return timeslot || null;
    }
};

export default Exercise;
