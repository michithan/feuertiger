import { Prisma } from '@feuertiger/schema-prisma';

import faker from './faker';

export interface ExerciseConnectionNeeds {
    timeslot: Prisma.TimeslotCreateInput;
    participants: Prisma.PersonCreateInput[];
    leaders: Prisma.PersonCreateInput[];
}

export const createExercise = ({
    participants,
    leaders,
    timeslot
}: ExerciseConnectionNeeds): Prisma.ExerciseCreateInput => ({
    id: `exercise:${faker.random.uuid()}`,
    topic: faker.random.words(2),
    timeslot: {
        connect: {
            id: timeslot.id
        }
    },
    participants: {
        connect: participants.map(({ id }) => ({ id }))
    },
    leaders: {
        connect: leaders.map(({ id }) => ({ id }))
    }
});
