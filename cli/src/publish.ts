import execa from 'execa';
import { gitlab, git, npmRegistry } from '@feuertiger/config';

export default async (): Promise<void> => {
    const { branchSlug, commit } = git;
    const { token } = gitlab;
    const npmLogin = `npm config set ${npmRegistry}:_authToken ${token}`;
    const lernaPublish = `lerna publish prerelease --no-push --yes --exact --preid=${branchSlug}.${commit}`;
    try {
        await execa.command(`${npmLogin} && ${lernaPublish}`, {
            shell: true,
            stdout: 'inherit',
            stderr: 'inherit'
        });
    } catch (error) {
        console.log(error);
    }
};
