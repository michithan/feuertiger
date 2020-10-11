import * as path from 'path';
import execa from 'execa';
import { isMainBranch } from '@feuertiger/config';

import { test } from './seeds';

const getPrismaBinary = async (): Promise<string> => {
    const { stdout } = await execa('yarn', ['bin', 'prisma']);
    return stdout;
};

export const migrate = async (): Promise<void> => {
    const bin = await getPrismaBinary();
    const schemaProjectPath = path.dirname(
        require.resolve('@feuertiger/schema-prisma/package.json')
    );
    const schemaPath = path.resolve(schemaProjectPath, 'src', 'schema.prisma');
    console.log('Migrate: ', schemaProjectPath);

    try {
        await execa(
            bin,
            [
                'migrate',
                'up',
                '--experimental',
                '--create-db',
                `--schema=${schemaPath}`
            ],
            {
                stdout: 'inherit',
                stderr: 'inherit',
                cwd: schemaProjectPath
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export const seed = async (): Promise<void> => {
    if (isMainBranch) {
        await test();
    }
};

export const migrateAndSeed = async (): Promise<void> => {
    await migrate();
    await seed();
};
