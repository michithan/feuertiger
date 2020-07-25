import faker from './faker';
import { Grade, PromotionCreateInput, PersonCreateInput } from '../../dist';

export interface PromotionConnectionNeeds {
    person: PersonCreateInput;
}

export const createPromotion = ({
    person
}: PromotionConnectionNeeds): PromotionCreateInput => ({
    id: `promotion:${faker.random.uuid()}`,
    person: {
        connect: {
            id: person.id
        }
    },
    grade: Grade.FM,
    dateOfPromotion: faker.date.past()
});
