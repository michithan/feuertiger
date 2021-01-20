import { Prisma } from '@feuertiger/schema-prisma';

import faker from './faker';

export const createTimeslot = (): Prisma.TimeslotCreateInput => ({
    id: `timeslot:${faker.random.uuid()}`,
    start: new Date(),
    end: new Date()
});
