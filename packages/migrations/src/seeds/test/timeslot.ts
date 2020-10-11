import { TimeslotCreateInput } from '@feuertiger/schema-prisma';

import faker from './faker';

export const createTimeslot = (): TimeslotCreateInput => ({
    id: `timeslot:${faker.random.uuid()}`,
    start: new Date(),
    end: new Date()
});
