import faker from './faker';
import { PersonCreateInput, MembershipCreateInput } from '../../dist';

export interface MembershipConnectionNeeds {
    person: PersonCreateInput;
}

export const createMembership = ({
    person
}: MembershipConnectionNeeds): MembershipCreateInput => ({
    id: `membership:${faker.random.uuid()}`,
    active: true,
    entryDate: faker.date.past(),
    person: {
        connect: {
            id: person.id
        }
    }
});
