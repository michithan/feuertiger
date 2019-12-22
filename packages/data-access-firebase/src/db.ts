import admin from 'firebase-admin';

import personsSeed from './seeds/seed-persons.json';
import exerciseSeed from './seeds/seed-exercise.json';

export const initDb = (): admin.firestore.Firestore => admin.firestore();

export const seed = (db: admin.firestore.Firestore): void => {
    const personsCollection = db.collection('Person');
    personsSeed.forEach(async (person: any, index) => {
        const id = `Person:${index}`;
        await personsCollection.doc(id).set({
            id,
            ...person
        });
    });

    const exerciseCollection = db.collection('Exercise');
    exerciseSeed.forEach(async (exercise: any, index) => {
        const id = `Exercise:${index}`;
        await exerciseCollection.doc(id).set({ id, ...exercise });
    });
};
