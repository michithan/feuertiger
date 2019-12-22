import admin from 'firebase-admin';

import personsSeed from './seeds/seed-persons.json';
import exerciseSeed from './seeds/seed-exercise.json';

export const initDb = (): admin.firestore.Firestore => admin.firestore();

export const seed = (db: admin.firestore.Firestore): void => {
    const personsCollection = db.collection('Person');
    personsSeed.forEach(async (person: any, index) => {
        const id = `Person:${index}`;
        person.id = id;

        const writeResult = await personsCollection.doc(id).set(person);
    });

    const exerciseCollection = db.collection('Exercise');
    exerciseSeed.forEach(async (exercise: any, index) => {
        const id = `Exercise:${index}`;
        exercise.id = id;

        const writeResult = await exerciseCollection.doc(id).set(exercise);
    });
};
