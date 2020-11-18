import { _Node } from '@feuertiger/schema-graphql';

export const parseGlobalId = (
    globalId: string
): { id: string; type: string } => {
    const [type, id] = globalId.split(':');
    return {
        id,
        type
    };
};

export const buildGlobalId = (id: string, type: string): string =>
    `${type}:${id}`;

export const connectInput = (connections: _Node[]): Connection[] =>
    connections
        ?.map(
            connection =>
                connection && {
                    upsert: {
                        id: connection.id
                    }
                }
        )
        .filter(connection => connection);

type Options = {
    connections: string[] | null;
};

type Connection = {
    upsert: {
        id: string;
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
