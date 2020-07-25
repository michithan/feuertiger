import faker from './faker';
import { AddressCreateInput } from '../../dist';

export const createAddress = (): AddressCreateInput => ({
    id: `address:${faker.random.uuid()}`,
    city: faker.address.city(),
    country: faker.address.country(),
    postalCode: faker.address.zipCode(),
    street: faker.address.streetName(),
    streetNumber: faker.random.number(99).toString()
});
