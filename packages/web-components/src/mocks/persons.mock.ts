import { Person } from '@feuertiger/schema-graphql';
import faker from 'faker';
import { defaultExerciseMock } from './exercises.mock';

faker.locale = 'de';
faker.seed(4);

export const mockDefaultPerson = (): Person => ({
    id: `person:${faker.random.uuid()}`,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatar: faker.image.cats(),
    address: {
        id: `address:${faker.random.uuid()}`,
        city: faker.address.city(),
        postalCode: faker.address.zipCode(),
        street: faker.address.streetName(),
        streetNumber: `${faker.random
            .number(99)
            .toString()}${faker.random.word()[0].toLocaleLowerCase()}`
    },
    birthName: faker.name.lastName(),
    dateOfBirth: faker.date.past().toDateString(),
    grade: 'FM',
    membershipNumber: faker.random.number().toString(),
    placeOfBirth: faker.address.city(),
    promotions: [
        {
            id: `promotion:${faker.random.uuid()}`,
            grade: 'FM',
            dateOfPromotion: faker.date.past().toDateString()
        }
    ],
    memberships: [
        {
            id: `membership:${faker.random.uuid()}`,
            active: true,
            entryDate: faker.date.past().toDateString()
        }
    ],
    exercisesParticipated: [defaultExerciseMock],
    exercisesLeaded: []
});

export const mockLeaderPerson = (): Person => ({
    id: `person:${faker.random.uuid()}`,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatar: faker.image.cats(),
    address: {
        id: `address:${faker.random.uuid()}`,
        city: faker.address.city(),
        postalCode: faker.address.zipCode(),
        street: faker.address.streetName(),
        streetNumber: faker.random.number(99).toString()
    },
    birthName: faker.name.lastName(),
    dateOfBirth: faker.date.past().toDateString(),
    grade: 'LM',
    membershipNumber: faker.random.number().toString(),
    placeOfBirth: faker.address.city(),
    promotions: [
        {
            id: `promotion:${faker.random.uuid()}`,
            grade: 'LM',
            dateOfPromotion: faker.date.past().toDateString()
        }
    ],
    memberships: [
        {
            id: `membership:${faker.random.uuid()}`,
            active: true,
            entryDate: faker.date.past().toDateString()
        }
    ],
    exercisesParticipated: [],
    exercisesLeaded: [defaultExerciseMock]
});
