/* eslint-disable no-console */
import '@feuertiger/native-js-extensions';
import { PrismaClient } from '@feuertiger/schema-prisma';

import { createPerson } from './person';
import { createAddress } from './address';
import { createDepartmentMembership } from './departmentMembership';
import { createPromotion } from './promotions';
import { createTimeslot } from './timeslot';
import { createExercise } from './exercise';
import { createDepartment } from '../base/department';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create = <T extends Record<string, any>>(
    delegate: T,
    { id, ...data }: { id: string }
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
any => {
    try {
        return delegate.create({
            data: { id, ...data }
        });
    } catch (error) {
        console.log('Seeding error: ', error);
    }
};

export type FakeFn<T> = () => T;
export type FakeFnWithConnectionNeeds<T, TConnectionNeeds> = (
    connectionNeeds: TConnectionNeeds
) => T;

const createSome = async <T extends { id: string }, TConnectionNeeds>(
    fakerFn: FakeFn<T> | FakeFnWithConnectionNeeds<T, TConnectionNeeds>,
    number: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delegate: any,
    client: PrismaClient,
    connectionNeeds?: TConnectionNeeds[]
) => {
    const fakes: Array<T> = Array.from(
        { length: number },
        connectionNeeds
            ? (_, index) => fakerFn(connectionNeeds[index])
            : fakerFn
    );

    try {
        const creates = fakes.map(fake => create(delegate, fake));
        const results = await client.$transaction(creates);
        console.log(
            `Seeded ${results.length} ${fakes?.[0]?.id?.split(':').shift()}`
        );
    } catch (error) {
        console.log(`Seeded 0 ${fakes?.[0]?.id?.split(':').shift()}`);
    }

    return fakes;
};

export default async (client: PrismaClient): Promise<void> => {
    const PERSONS_COUNT = 118;
    const EXERCISES_COUNT = 32;

    // upsert some addresses
    const addressFakes = await createSome(
        createAddress,
        PERSONS_COUNT,
        client.address,
        client
    );

    // upsert the fake department
    const departmentFakes = await createSome(
        createDepartment,
        1,
        client.department,
        client,
        addressFakes.map(address => ({ address }))
    );

    // upsert some persons
    const personsFakes = await createSome(
        createPerson,
        PERSONS_COUNT,
        client.person,
        client,
        addressFakes.map(address => ({ address }))
    );

    // upsert some memberships
    await createSome(
        createDepartmentMembership,
        PERSONS_COUNT,
        client.departmentMembership,
        client,
        personsFakes.map(person => ({
            person,
            department: departmentFakes[0]
        }))
    );

    // upsert some promotions
    await createSome(
        createPromotion,
        PERSONS_COUNT,
        client.promotion,
        client,
        personsFakes.map(person => ({ person }))
    );

    // upsert some timeslot
    const timeslotFakes = await createSome(
        createTimeslot,
        EXERCISES_COUNT,
        client.timeslot,
        client
    );

    // upsert some exercises
    await createSome(
        createExercise,
        EXERCISES_COUNT,
        client.exercise,
        client,
        timeslotFakes.map(timeslot => ({
            timeslot,
            leaders: personsFakes.slice(personsFakes.length - 5),
            participants: personsFakes.slice(20)
        }))
    );
};
