import { execSync } from 'child_process';

import constants from './constants.json';
import defaults from './defaults.json';

export interface Config {
    projectName: string;
    gitlab: {
        projectId: string;
        token: string;
        user: string;
        email: string;
        repositoryUrl: string;
        branch: string;
        branchSlug: string;
        commit: string;
    };
    npmRegistry: string;
    dockerRegistry: string;
    dockerRegistryRepository: string;
    gcp: {
        project: string;
        region: string;
        zone: string;
        accessToken: string;
    };
    digitaloceanToken: string;
    firebaseAppConfig: {
        projectId: string;
        apiKey: string;
        authDomain: string;
    };
    firebaseAdminConfig: {
        projectId: string;
        privateKey: string;
        clientEmail: string;
    };
    postgresUri: string;
    postgresUser: string;
    postgresPassword: string;
    graphqlUri: string;
    webClientUri: string;
    env: {
        GIT_USER: string;
        GIT_EMAIL: string;
        POSTGRES_URI: string;
        GRAPHQL_URI: string;
        WEB_CLIENT_URI: string;
    };
}

/*
 * Get all existing variables
 */
const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_URI,
    GRAPHQL_URI,
    WEB_CLIENT_URI,
    DIGITALOCEAN_TOKEN,
    GIT_TOKEN,
    GIT_USER,
    GIT_EMAIL
} = process.env;

const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');

const tryGetFromShell = (command: string): string =>
    execSync(`${command} || echo`, {
        stdio: ['pipe', 'pipe', 'ignore']
    })
        .toString('utf-8')
        .trim();
const tryGetGitBranchSlug = () =>
    tryGetFromShell('git branch --show-current')
        .toLowerCase()
        .replace(/[^a-z^0-9]/g, '-');
const tryGetGitCommitHashShort = () =>
    tryGetFromShell('git rev-parse --short HEAD');
const tryGetGitUserName = () => tryGetFromShell('git config --get user.name');
const tryGetGitUserEmail = () => tryGetFromShell('git config --get user.email');

/*
 * Compute configs
 */
const config = {
    projectName: constants.projectName,
    gitlab: {
        ...constants.gitlab,
        token: GIT_TOKEN,
        user: GIT_USER || tryGetGitUserName(),
        email: GIT_EMAIL || tryGetGitUserEmail(),
        repositoryUrl: '',
        branch: '',
        branchSlug: tryGetGitBranchSlug(),
        commit: tryGetGitCommitHashShort()
    },
    npmRegistry: `//gitlab.com/api/v4/projects/${constants.gitlab.projectId}/packages/npm/`,
    dockerRegistry: constants.dockerRegistry,
    dockerRegistryRepository: `${constants.dockerRegistry}/${constants.projectName}/${constants.projectName}`,
    gcp: constants.gcp,
    digitaloceanToken: DIGITALOCEAN_TOKEN,
    firebaseAppConfig: {
        projectId: FIREBASE_CONFIG && FIREBASE_CONFIG.projectId,
        apiKey: FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey,
        authDomain: FIREBASE_CONFIG && FIREBASE_CONFIG.authDomain
    },
    firebaseAdminConfig: {
        projectId: GOOGLE_CREDENTIALS && GOOGLE_CREDENTIALS.project_id,
        privateKey: GOOGLE_CREDENTIALS && GOOGLE_CREDENTIALS.private_key,
        clientEmail: GOOGLE_CREDENTIALS && GOOGLE_CREDENTIALS.client_email
    },
    postgresUser: POSTGRES_USER || defaults.postgresUser,
    postgresPassword: POSTGRES_PASSWORD || defaults.postgresPassword,
    postgresUri: POSTGRES_URI || defaults.postgresUri,
    graphqlUri: GRAPHQL_URI || defaults.graphqlUri,
    webClientUri: WEB_CLIENT_URI || defaults.webClientUri
};

export default {
    ...config,
    env: {
        GIT_USER: config.gitlab.user,
        GIT_EMAIL: config.gitlab.email,
        POSTGRES_URI: config.postgresUri,
        GRAPHQL_URI: config.graphqlUri,
        WEB_CLIENT_URI: config.webClientUri
    }
} as Config;
