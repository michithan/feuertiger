import { DepartmentMembership } from '@feuertiger/schema-graphql';
import faker from 'faker';
import { mockDefaultPerson } from '.';

faker.locale = 'de';
faker.seed(4);

export const mockDefaultDepartmentMember = (): DepartmentMembership => ({
    id: `departmentMembership:${faker.random.uuid()}`,
    active: true,
    entryDate: faker.date.past(),
    person: mockDefaultPerson()
});
