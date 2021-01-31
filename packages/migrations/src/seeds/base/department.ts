import { Prisma, PrismaClient } from '@feuertiger/schema-prisma';
import { collectLocationData } from '@feuertiger/data-collectors';

import faker from '../test/faker';
import { create } from '../test';

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

export const createLfvDepartments = async (
    client: PrismaClient
): Promise<void> => {
    const departments = await collectLocationData.lfv(true);
    if (departments) {
        try {
            const upserts = departments
                .map<Prisma.DepartmentCreateInput>(
                    (department): Prisma.DepartmentCreateInput => ({
                        id: `department:${faker.random.uuid()}`,
                        name: department.name ?? '',
                        address: {
                            create: {
                                id: `address:${faker.random.uuid()}`,
                                city: department.adress.city ?? '',
                                postalCode: department.adress.postalCode ?? '',
                                street: department.adress.street ?? '',
                                streetNumber:
                                    department.adress.streetNumber ?? '',
                                country: 'Deutschland'
                            }
                        }
                    })
                )
                .map(department => create(client.department, department));
            const results = await client.$transaction(upserts);
            console.log(`Seeded ${results.length} departments`);
        } catch (error) {
            console.log(`Seeded 0 departments`);
        }
    }
};
