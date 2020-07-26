const { execSync } = require('child_process');
const constants = require('./constants.json');

/*
 * Get all existing environment variables
 */
const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG);
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const {
    POSTGRES_URI,
    GRAPHQL_URI,
    WEB_CLIENT_URI,
    DIGITALOCEAN_TOKEN,
    GIT_TOKEN
} = process.env;

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
    gitBranchSlug: execSync('git branch --show-current')
        .toString('utf-8')
        .trim()
        .toLowerCase()
        .replace(/[^a-z^0-9]/g, '-'),
    gitCommitHashShort: execSync('git rev-parse --short HEAD')
        .toString('utf-8')
        .trim(),
    firebaseAppConfig: {
        projectId: FIREBASE_CONFIG.project_id,
        apiKey: FIREBASE_CONFIG.apiKey,
        authDomain: FIREBASE_CONFIG.authDomain
    },
    firebaseAdminConfig: {
        projectId: GOOGLE_CREDENTIALS.project_id,
        privateKey: GOOGLE_CREDENTIALS.private_key,
        clientEmail: GOOGLE_CREDENTIALS.client_email
    },
    postgresUri:
        POSTGRES_URI ||
        'postgresql://feuertiger:feuertiger@localhost:5432/feuertiger',
    graphqlUri: GRAPHQL_URI || 'http://localhost:4000/',
    webClientUri: WEB_CLIENT_URI || 'http://localhost:3000'
};

/*
 * Re-export all deafault environment variables
 */
execSync(`export WEB_CLIENT_URI=${exports.webClientUri}`);
execSync(`export GRAPHQL_URI=${exports.graphqlUri}`);
execSync(`export POSTGRES_URI=${exports.postgresUri}`);

execSync(`export CYPRESS_BASE_URL=${exports.webClientUri}`);

execSync(`export GIT_BRANCH_SLUG=${exports.gitBranchSlug}`);
execSync(`export GIT_COMMIT_HASH_SHORT=${exports.gitCommitHashShort}`);
