import faker from 'faker';
import { TimeslotCreateInput } from '../../dist';

export const createTimeslot = (): TimeslotCreateInput => ({
    id: `timeslot:${faker.random.uuid()}`,
    start: new Date(),
    end: new Date()
});
