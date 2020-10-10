import execa from 'execa';
import { Flags } from '.';
import { exec } from './utils/exec';
import { PackageInfo } from './utils/list';

const prettierrc = require.resolve('../../.prettierrc');
const prettierignore = require.resolve('../../.prettierignore');

const getPrettierBinary = async (cwd: string): Promise<string> => {
    const { stdout } = await execa('yarn', ['bin', 'prettier'], { cwd });
    return stdout;
};

const cwd = process.cwd();

const types = ['js', 'jsx', 'ts', 'tsx', 'json', 'graphql', 'yml', 'md'];

export default async (flags: Flags): Promise<void> => {
    const bin = await getPrettierBinary(cwd);
    try {
        await exec(
            flags,
            ({ location }: PackageInfo) =>
                execa(
                    bin,
                    [
                        `${location}/**/*.{${types.join(',')}}`,
                        '--check',
                        '--write',
                        '--config',
                        prettierrc,
                        '--ignore-path',
                        prettierignore,
                        '--loglevel',
                        'log'
                    ],
                    {
                        detached: true,
                        stdout: 'pipe'
                    }
                ),
            true
        );
    } catch (error) {
        console.log(error);
    }
};
