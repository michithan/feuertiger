import execa from 'execa';
import { git, npmRegistry } from '@feuertiger/config/src';

export default async (): Promise<void> => {
    const { branchSlug, commit } = git;
    try {
        await execa(
            'lerna',
            [
                'publish',
                'prerelease',
                '--no-push',
                '--yes',
                '--exact',
                `--preid=${branchSlug}.${commit}`,
                `--registry=${npmRegistry}`
            ],
            {
                stdout: 'inherit',
                stderr: 'inherit'
            }
        );
    } catch (error) {
        console.log(error);
    }
};
