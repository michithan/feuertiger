const { execSync } = require('child_process');
const constants = require('./constants.json');

/*
 * Get all existing environment variables
 */
const {
    POSTGRES_URI,
    GRAPHQL_URI,
    WEB_CLIENT_URI,
    DIGITALOCEAN_TOKEN,
    GIT_TOKEN,
    GIT_USER
} = process.env;

const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');

const tryGetGitBranchSlug = () =>
    execSync('git branch --show-current || echo none', {
        stdio: ['pipe', 'pipe', 'ignore']
    })
        .toString('utf-8')
        .trim()
        .toLowerCase()
        .replace(/[^a-z^0-9]/g, '-');

const tryGetGitCommitHashShort = () =>
    execSync('git rev-parse --short HEAD || echo none', {
        stdio: ['pipe', 'pipe', 'ignore']
    })
        .toString('utf-8')
        .trim();

/*
 * Compute configs
 */
exports = {
    projectName: constants.projectName,
    gitlab: {
        ...constants.gitlab,
        token: GIT_TOKEN,
        user: GIT_USER
    },
    gcp: constants.gcp,
    digitaloceanToken: DIGITALOCEAN_TOKEN,
    gitBranchSlug: tryGetGitBranchSlug(),
    gitCommitHashShort: tryGetGitCommitHashShort(),
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
    postgresUri:
        POSTGRES_URI ||
        'postgresql://feuertiger:feuertiger@localhost:5432/feuertiger',
    graphqlUri: GRAPHQL_URI || 'http://localhost:4000/',
    webClientUri: WEB_CLIENT_URI || 'http://localhost:3000/'
};
