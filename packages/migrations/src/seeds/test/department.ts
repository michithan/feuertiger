import { DepartmentCreateInput } from '@feuertiger/schema-prisma';

import faker from './faker';

export const createDepartment = (): DepartmentCreateInput => ({
    id: `department:${faker.random.uuid()}`,
    name: 'ff feuertiger'
});
