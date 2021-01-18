import {
    AddressCreateInput,
    DepartmentCreateInput
} from '@feuertiger/schema-prisma';

import faker from './faker';

export interface DepartmentConnectionNeeds {
    address: AddressCreateInput;
}

export const createDepartment = ({
    address
}: DepartmentConnectionNeeds): DepartmentCreateInput => ({
    id: `department:${faker.random.uuid()}`,
    name: 'ff feuertiger',
    address: {
        connect: {
            id: address.id
        }
    }
});
