import { execSync } from 'child_process';

export const tryGetFromShell = (command: string): string =>
    execSync(`${command} || echo`, {
        stdio: ['pipe', 'pipe', 'ignore']
    })
        .toString('utf-8')
        .trim();

export const tryGetGitBranch = (): string =>
    tryGetFromShell('git branch --show-current');

export const tryGetGitBranchSlug = (): string =>
    tryGetGitBranch()
        .toLowerCase()
        .replace(/[^a-z^0-9]/g, '-');

export const tryGetGitCommitHashShort = (): string =>
    tryGetFromShell('git rev-parse --short HEAD');

export const tryGetGitUserName = (): string =>
    tryGetFromShell('git config --get user.name');

export const tryGetGitUserEmail = (): string =>
    tryGetFromShell('git config --get user.email');
