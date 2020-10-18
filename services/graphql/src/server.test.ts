import { test, describe, expect, jest } from '@jest/globals';

describe('Test server', () => {
    test('should create server', () => {
        let triggeredMigrateAndSeed;
        jest.mock(
            '@feuertiger/migrations',
            () => ({
                migrateAndSeed: () => (triggeredMigrateAndSeed = true)
            }),
            {
                virtual: true
            }
        );
        const server = require('./server').gqlServer();
        expect(server).toBeTruthy();
        expect(triggeredMigrateAndSeed).toBeTruthy();
    });
});
