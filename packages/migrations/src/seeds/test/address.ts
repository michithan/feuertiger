import { AddressCreateInput } from '@feuertiger/schema-prisma';

import faker from './faker';

export const createAddress = (): AddressCreateInput => ({
    id: `address:${faker.random.uuid()}`,
    city: faker.address.city(),
    country: faker.address.country(),
    postalCode: faker.address.zipCode(),
    street: faker.address.streetName(),
    streetNumber: faker.random.number(99).toString()
});
