import faker from 'faker';
import { PersonCreateInput, Grade } from '../../dist';
import exercises from './exercise';

const length = 100;

faker.locale = 'de';
faker.seed(length);

const persons: Array<PersonCreateInput> = Array.from({ length }, () => ({
    id: `person:${faker.random.uuid()}`,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatar: faker.image.cats(),
    address: {
        create: {
            id: `address:${faker.random.uuid()}`,
            city: faker.address.city(),
            country: faker.address.country(),
            postalCode: faker.address.zipCode(),
            street: faker.address.streetName(),
            streetNumber: faker.random.number(99)
        }
    },
    birthName: faker.name.lastName(),
    dateOfBirth: faker.date.past().toDateString(),
    grade: Grade.FM,
    membershipNumber: faker.random.number().toString(),
    placeOfBirth: faker.address.city(),
    promotions: {
        create: [
            {
                id: `promotion:${faker.random.uuid()}`,
                grade: Grade.FM,
                dateOfPromotion: faker.date.past().toDateString()
            }
        ]
    },
    memberships: {
        create: [
            {
                id: `membership:${faker.random.uuid()}`,
                active: true,
                entryDate: faker.date.past().toDateString()
            }
        ]
    },
    exercisesParticipated: {
        connect: [
            {
                id: exercises[0].id
            },
            {
                id: exercises[1].id
            },
            {
                id: exercises[2].id
            },
            {
                id: exercises[4].id
            }
        ]
    }
}));

persons[0].exercisesLeaded = {
    connect: [
        {
            id: exercises[0].id
        },
        {
            id: exercises[1].id
        },
        {
            id: exercises[2].id
        },
        {
            id: exercises[4].id
        }
    ]
};

export default persons;
