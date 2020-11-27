import {
    PersonCreateInput,
    DepartmentMembershipCreateInput,
    DepartmentCreateInput
} from '@feuertiger/schema-prisma';

import faker from './faker';

export interface DepartmentMembershipConnectionNeeds {
    person: PersonCreateInput;
    department: DepartmentCreateInput;
}

export const createDepartmentMembership = ({
    person,
    department
}: DepartmentMembershipConnectionNeeds): DepartmentMembershipCreateInput => ({
    id: `departmentMembership:${faker.random.uuid()}`,
    active: true,
    department: {
        connect: {
            id: department.id
        }
    },
    entryDate: faker.date.past(),
    person: {
        connect: {
            id: person.id
        }
    }
});
