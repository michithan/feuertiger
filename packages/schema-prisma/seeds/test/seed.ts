/* eslint-disable no-console */
import faker from 'faker';
import { PrismaClient } from '../../dist';
import { createPerson } from './person';
import { createAddress } from './address';
import { createMembership } from './membership';
import { createPromotion } from './promotions';
import { createTimeslot } from './timeslot';
import { createExercise } from './exercise';

const client = new PrismaClient();

const save = async (delegate: any, { id, ...data }: any) => {
    try {
        const result = await delegate.upsert({
            where: {
                id
            },
            create: { id, ...data },
            update: data
        });
        console.log('result ', result);
        console.log('Saved ', id);
    } catch (error) {
        console.log('Seeding error: ', error);
    }
};

type FakeFn<T> = () => T;
type FakeFnWithConnectionNeeds<T, TConnectionNeeds> = (
    connectionNeeds: TConnectionNeeds
) => T;

const upsertSome = async <T, TD, TConnectionNeeds>(
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
    await Promise.all(fakes.map(fake => save(delegate, fake)));
    return fakes;
};

(async () => {
    faker.locale = 'de';
    faker.seed(1000);

    // upsert some addresses
    const addressFakes = await upsertSome(createAddress, 100, client.address);

    // upsert some persons
    const personsFakes = await upsertSome(
        createPerson,
        100,
        client.person,
        addressFakes.map(address => ({ address }))
    );

    // upsert some memberships
    await upsertSome(
        createMembership,
        100,
        client.membership,
        personsFakes.map(person => ({ person }))
    );

    // upsert some promotions
    await upsertSome(
        createPromotion,
        100,
        client.promotion,
        personsFakes.map(person => ({ person }))
    );

    // upsert some timeslot
    const timeslotFakes = await upsertSome(
        createTimeslot,
        100,
        client.timeslot
    );

    // upsert some exercises
    await upsertSome(
        createExercise,
        100,
        client.exercise,
        timeslotFakes.map(timeslot => ({
            timeslot,
            leaders: personsFakes.slice(personsFakes.length - 5),
            participants: personsFakes.slice(personsFakes.length - 20)
        }))
    );

    client.disconnect();
})();
