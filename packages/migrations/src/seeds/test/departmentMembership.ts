import { Prisma } from '@feuertiger/schema-prisma';

import faker from './faker';

export interface DepartmentMembershipConnectionNeeds {
    person: Prisma.PersonCreateInput;
    department: Prisma.DepartmentCreateInput;
}

export const createDepartmentMembership = ({
    person,
    department
}: DepartmentMembershipConnectionNeeds): Prisma.DepartmentMembershipCreateInput => ({
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
