import { PrismaClient } from '@feuertiger/schema-prisma';
import { migrateAndSeed } from '.';

(async () => {
    const prismaClient = new PrismaClient();
    await migrateAndSeed(prismaClient);
    prismaClient.$disconnect();
})();
