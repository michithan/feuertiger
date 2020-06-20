import faker from 'faker';
import { Grade, PersonCreateInput, Sex } from '../../dist';
import exercises from './exercise';

const length = 100;

faker.locale = 'de';
faker.seed(length);

const createPerson = (): PersonCreateInput => ({
    id: `person:${faker.random.uuid()}`,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatar: faker.image.cats(),
    phone: faker.phone.phoneNumber(),
    sex: Sex.FEMAL,
    address: {
        create: {
            id: `address:${faker.random.uuid()}`,
            city: faker.address.city(),
            country: faker.address.country(),
            postalCode: faker.address.zipCode(),
            street: faker.address.streetName(),
            streetNumber: faker.random.number(99).toString()
        }
    },
    birthName: faker.name.lastName(),
    dateOfBirth: faker.date.past(),
    membershipNumber: faker.random.number().toString(),
    placeOfBirth: faker.address.city(),
    promotions: {
        create: [
            {
                id: `promotion:${faker.random.uuid()}`,
                grade: Grade.FM,
                dateOfPromotion: faker.date.past()
            }
        ]
    },
    memberships: {
        create: [
            {
                id: `membership:${faker.random.uuid()}`,
                active: true,
                entryDate: faker.date.past()
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
});

const persons: Array<PersonCreateInput> = Array.from({ length }, createPerson);

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
