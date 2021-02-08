import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@feuertiger/schema-prisma';
import { _Node } from '@feuertiger/schema-graphql';

type DelegateKey = Exclude<keyof PrismaClient, `$${string}`>;

export type Delegate = PrismaClient[DelegateKey];

export type GlobalId = `${DelegateKey}:${string}`;

const delegateKeys = Object.getOwnPropertyNames(PrismaClient).filter(
    name => !name.startsWith('$')
);

const isDelegateType = (type: string): type is DelegateKey =>
    delegateKeys.includes(type);

const isGlobalId = (id: string): id is GlobalId => {
    const [type] = id?.split(':') ?? [];
    return isDelegateType(type);
};

export const parseGlobalId = (
    globalId: GlobalId | string
): { id: string; type: DelegateKey } => {
    const [type, id] = globalId.split(':');

    if (isDelegateType(type)) {
        return {
            id,
            type
        };
    }

    throw new Error('no valid global id');
};

export const buildGlobalId = (id: string, type: DelegateKey): GlobalId =>
    `${type}:${id}` as GlobalId;

export const createGlobalId = (type: DelegateKey): GlobalId =>
    buildGlobalId(uuidv4(), type);

export const connectInput = (connections: _Node[]): Connection[] =>
    connections
        ?.map(({ id }) => id)
        .map(id => {
            if (isGlobalId(id)) {
                return {
                    upsert: {
                        id
                    }
                };
            }
            throw new Error('no valid global id');
        })
        .filter(connection => connection);

type Options = {
    connections: string[] | null;
};

type Connection = {
    upsert: {
        id: GlobalId;
    };
};

export const mapInput = <
    T extends _Node & Record<string, unknown | _Node | _Node[]>,
    O extends _Node & Record<string, unknown | Connection[]> = T
>(
    { id, ...rest }: T,
    options: Options | null | undefined
): O => {
    const data = rest as Record<string, unknown | Connection[]>;

    options?.connections?.forEach(key => {
        const connections = data[key];
        if (Array.isArray(connections) && key !== '0') {
            data[key] = connectInput(connections as _Node[]);
        }
    });

    return { id, ...data } as O;
};
