import { Grade, Prisma } from '@feuertiger/schema-prisma';

import faker from './faker';

export interface PromotionConnectionNeeds {
    person: Prisma.PersonCreateInput;
}

export const createPromotion = ({
    person
}: PromotionConnectionNeeds): Prisma.PromotionCreateInput => ({
    id: `promotion:${faker.random.uuid()}`,
    person: {
        connect: {
            id: person.id
        }
    },
    grade: Grade.FM,
    dateOfPromotion: faker.date.past()
});
