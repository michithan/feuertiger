import execa from 'execa';
import config from '@feuertiger/config';

export default async (): Promise<void> => {
    const {
        gitlab: { branchSlug, commit, token },
        npmRegistry
    } = config;
    try {
        await execa(
            'npm',
            ['config', 'set', `'${npmRegistry}:_authToken' "${token}"`],
            {
                stdout: 'inherit',
                stderr: 'inherit'
            }
        );
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
