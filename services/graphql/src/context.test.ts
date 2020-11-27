import { test, describe, expect } from '@jest/globals';
import firebase from 'firebase-admin';
import { PrismaClient } from '@feuertiger/schema-prisma';

import context from './context';

describe('Test context', () => {
    test('should create context', () => {
        const contextResolver = context({
            prisma: new PrismaClient(),
            authProvider: firebase.auth()
        });
        expect(contextResolver).toBeTruthy();
    });
});
