import admin, { ServiceAccount } from 'firebase-admin';

import { WriteResult, Firestore } from '@google-cloud/firestore';

import personsSeed from './seeds/seed-persons.json';
import exerciseSeed from './seeds/seed-exercise.json';

export const initDb = (secrets: ServiceAccount): Firestore =>
    admin
        .initializeApp({
            credential: admin.credential.cert(secrets)
        })
        .firestore();

export const seed = (db: Firestore): void => {
    const personsCollection = db.collection('Person');
    personsSeed.forEach(async (person: any, index) => {
        const id = `Person:${index}`;
        person.id = id;

        const writeResult: WriteResult = await personsCollection
            .doc(id)
            .set(person);
    });

    const exerciseCollection = db.collection('Exercise');
    exerciseSeed.forEach(async (exercise: any, index) => {
        const id = `Exercise:${index}`;
        exercise.id = id;

        const writeResult: WriteResult = await exerciseCollection
            .doc(id)
            .set(exercise);
    });
};
