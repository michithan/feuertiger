import { Exercise } from '@feuertiger/schema-graphql';
import faker from 'faker';

faker.locale = 'de';
faker.seed(4);

export const defaultExerciseMock: Exercise = {
    id: `timeslot:${faker.random.uuid()}`,
    topic: faker.random.words(2),
    timeslot: {
        start: new Date().toDateString(),
        end: new Date().toDateString()
    }
};

export const secondExerciseMock: Exercise = {
    id: `timeslot:${faker.random.uuid()}`,
    topic: faker.random.words(2),
    timeslot: {
        start: new Date().toDateString(),
        end: new Date().toDateString()
    }
};
