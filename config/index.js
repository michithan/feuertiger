const { execSync } = require('child_process');

const constants = require('./constants.json');
const defaults = require('./constants.json');

/*
 * Get all existing variables
 */
const {
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

const tryGetFromShell = command =>
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
exports = {
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
    gcp: constants.gcp,
    digitaloceanToken: DIGITALOCEAN_TOKEN,
    firebaseAppConfig: {
        projectId: FIREBASE_CONFIG && FIREBASE_CONFIG.project_id,
        apiKey: FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey,
        authDomain: FIREBASE_CONFIG && FIREBASE_CONFIG.authDomain
    },
    firebaseAdminConfig: {
        projectId: GOOGLE_CREDENTIALS && GOOGLE_CREDENTIALS.project_id,
        privateKey: GOOGLE_CREDENTIALS && GOOGLE_CREDENTIALS.private_key,
        clientEmail: GOOGLE_CREDENTIALS && GOOGLE_CREDENTIALS.client_email
    },
    postgresUri: POSTGRES_URI || defaults.postgresUri,
    graphqlUri: GRAPHQL_URI || defaults.graphqlUri,
    webClientUri: WEB_CLIENT_URI || defaults.webClientUri
};
