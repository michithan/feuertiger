/* eslint-disable no-console */
import { PrismaClient } from '@feuertiger/schema-prisma';

import { createPerson } from './person';
import { createAddress } from './address';
import { createMembership } from './membership';
import { createPromotion } from './promotions';
import { createTimeslot } from './timeslot';
import { createExercise } from './exercise';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const upsert = (delegate: any, { id, ...data }: { id: string }) => {
    try {
        return delegate.upsert({
            where: {
                id
            },
            create: { id, ...data },
            update: data
        });
    } catch (error) {
        console.log('Seeding error: ', error);
    }
};

export type FakeFn<T> = () => T;
export type FakeFnWithConnectionNeeds<T, TConnectionNeeds> = (
    connectionNeeds: TConnectionNeeds
) => T;

const upsertSome = async <T extends { id: string }, TD, TConnectionNeeds>(
    fakerFn: FakeFn<T> | FakeFnWithConnectionNeeds<T, TConnectionNeeds>,
    number: number,
    delegate: TD,
    connectionNeeds?: TConnectionNeeds[]
) => {
    const fakes: Array<T> = Array.from(
        { length: number },
        connectionNeeds
            ? (_, index) => fakerFn(connectionNeeds[index])
            : fakerFn
    );
    const upserts = fakes.map(fake => upsert(delegate, fake));
    const results = await Promise.all(upserts);
    console.log(
        `Seeded ${results.length} ${fakes?.[0]?.id?.split(':').shift()}`
    );
    return fakes;
};

export default async (): Promise<void> => {
    const client = new PrismaClient();

    const PERSONS_COUNT = 118;
    const EXERCICES_COUNT = 32;

    // upsert some addresses
    const addressFakes = await upsertSome(
        createAddress,
        PERSONS_COUNT,
        client.address
    );

    // upsert some persons
    const personsFakes = await upsertSome(
        createPerson,
        PERSONS_COUNT,
        client.person,
        addressFakes.map(address => ({ address }))
    );

    // upsert some memberships
    await upsertSome(
        createMembership,
        PERSONS_COUNT,
        client.membership,
        personsFakes.map(person => ({ person }))
    );

    // upsert some promotions
    await upsertSome(
        createPromotion,
        PERSONS_COUNT,
        client.promotion,
        personsFakes.map(person => ({ person }))
    );

    // upsert some timeslot
    const timeslotFakes = await upsertSome(
        createTimeslot,
        EXERCICES_COUNT,
        client.timeslot
    );

    // upsert some exercises
    await upsertSome(
        createExercise,
        EXERCICES_COUNT,
        client.exercise,
        timeslotFakes.map(timeslot => ({
            timeslot,
            leaders: personsFakes.slice(personsFakes.length - 5),
            participants: personsFakes.slice(20)
        }))
    );
};
