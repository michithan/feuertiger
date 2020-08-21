import { Exercise } from '@feuertiger/schema-graphql';
import faker from 'faker';

faker.locale = 'de';
faker.seed(4);

export const defaultExerciseMock: Exercise = {
    id: `exercise:${faker.random.uuid()}`,
    topic: faker.random.words(2),
    timeslot: {
        id: `timeslot:${faker.random.uuid()}`,
        start: new Date().toDateString(),
        end: new Date().toDateString()
    }
};

export const secondExerciseMock: Exercise = {
    id: `exercise:${faker.random.uuid()}`,
    topic: faker.random.words(2),
    timeslot: {
        id: `timeslot:${faker.random.uuid()}`,
        start: new Date().toDateString(),
        end: new Date().toDateString()
    }
};
