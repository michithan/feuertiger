import { execSync } from 'child_process';
import simpleGit, { SimpleGit } from 'simple-git';
import config from '@feuertiger/config';

const repo: SimpleGit = simpleGit({
    baseDir: process.cwd(),
    binary: 'git'
});

const hasDiffs = async (): Promise<boolean> =>
    !!execSync('git diff-index --quiet HEAD || echo none');

const checkout = async () => {
    const {
        gitlab: { branch, projectId, user, email, token, repositoryUrl }
    } = config;

    await repo.remote([
        'set-url',
        'set-origin',
        `https://${user}:${token}@${repositoryUrl}`
    ]);
    await repo.addConfig('user.name', user);
    await repo.addConfig('user.email', email);
    await repo.checkoutBranch(branch, `origin/${branch}`);
    await repo.push(branch);

    execSync(
        `npm config set '//gitlab.com/api/v4/projects/${projectId}/packages/npm/:_authToken' "${config.gitlab.token}"`
    );
};

const install = async () => {
    execSync('lerna bootstrap --since');
};

const ensureFormat = async () => {
    execSync('yarn format');

    if (hasDiffs()) {
        execSync('git commit -am "format"');
        execSync(
            'git push -o ci.variable="CI_SKIP=true" -o ci.variable="DEPENDENCY_SCANNING_DISABLED=true" -o ci.variable="LICENSE_MANAGEMENT_DISABLED=true"'
        );
    }
};

const build = async () => {
    execSync('yarn build --since');
};

const ensureLint = async () => {
    execSync('yarn lint --since');

    if (hasDiffs()) {
        execSync('git commit -am "fix"');
        execSync(
            'git push -o ci.variable="CI_SKIP=true" -o ci.variable="DEPENDENCY_SCANNING_DISABLED=true" -o ci.variable="LICENSE_MANAGEMENT_DISABLED=true"'
        );
    }
};

const publish = async () => {
    const {
        gitlab: { branchSlug, commit, projectId }
    } = config;
    execSync(
        `lerna publish prerelease --no-push --yes --exact --preid=${branchSlug}.${commit} --registry=//gitlab.com/api/v4/projects/${projectId}/packages/npm/`
    );
    execSync(
        'git push -o ci.variable="CI_SKIP=true" -o ci.variable="DEPENDENCY_SCANNING_DISABLED=true" -o ci.variable="LICENSE_MANAGEMENT_DISABLED=true" --tags origin HEAD:$CI_COMMIT_REF_NAME'
    );
};

const ci = async () => {
    await checkout();
    await install();
    await ensureFormat();
    await build();
    await ensureLint();
    await publish();
};

ci();
