import {
    ExerciseCreateInput,
    PersonCreateInput,
    TimeslotCreateInput
} from '@feuertiger/schema-prisma';

import faker from './faker';

export interface ExerciseConnectionNeeds {
    timeslot: TimeslotCreateInput;
    participants: PersonCreateInput[];
    leaders: PersonCreateInput[];
}

export const createExercise = ({
    participants,
    leaders,
    timeslot
}: ExerciseConnectionNeeds): ExerciseCreateInput => ({
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
