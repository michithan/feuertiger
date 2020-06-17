import { Person } from '@feuertiger/schema-graphql';
import faker from 'faker';
import { defaultExerciseMock } from './exercises.mock';

faker.locale = 'de';
faker.seed(4);

export const defaultPersonMock: Person = {
    id: faker.random.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatar: 'https://loremflickr.com/320/240/cats',
    exercisesParticipated: [defaultExerciseMock]
};

export const secondPErsonMock: Person = {
    id: faker.random.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatar: 'https://loremflickr.com/320/240/cats',
    exercisesLeaded: [defaultExerciseMock]
};
