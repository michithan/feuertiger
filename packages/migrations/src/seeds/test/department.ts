import { Prisma } from '@feuertiger/schema-prisma';

import faker from './faker';

export interface DepartmentConnectionNeeds {
    address: Prisma.AddressCreateInput;
}

export const createDepartment = ({
    address
}: DepartmentConnectionNeeds): Prisma.DepartmentCreateInput => ({
    id: `department:${faker.random.uuid()}`,
    name: 'ff feuertiger',
    address: {
        connect: {
            id: address.id
        }
    }
});
