import { test, describe, expect } from '@jest/globals';
import { parseGlobalId, buildGlobalId, GlobalId } from './id';

describe('Test id utils', () => {
    test('should parse global id', () => {
        const globalId: GlobalId = 'person:451443';
        const { id, type } = parseGlobalId(globalId);
        expect(id).toBe('451443');
        expect(type).toBe('type');
    });

    test('should build global id', () => {
        const id = buildGlobalId('451443', 'address');
        expect(id).toBe('type:451443');
    });

    test('should throw error when parsing invalid global id', () => {
        expect(() => {
            parseGlobalId('451443:asdf');
        }).toThrow();
    });
});
