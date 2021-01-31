import { PrismaClient } from '@feuertiger/schema-prisma';
import { createLfvDepartments } from './department';

export default async (client: PrismaClient): Promise<void> => {
    await createLfvDepartments(client);
};
