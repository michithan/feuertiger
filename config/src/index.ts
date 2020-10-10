/* eslint-disable camelcase */
import constants from './constants.json';
import defaults from './defaults.json';
import {
    tryGetGitBranchSlug,
    tryGetGitCommitHashShort,
    tryGetGitUserEmail,
    tryGetGitUserName
} from './utils';

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_URI,
    GRAPHQL_URI,
    WEB_CLIENT_URI,
    DIGITALOCEAN_TOKEN,
    GIT_TOKEN,
    GIT_USER,
    GIT_EMAIL,
    FIREBASE_CONFIG: FIREBASE_CONFIG_TEXT,
    GOOGLE_CREDENTIALS: GOOGLE_CREDENTIALS_TEXT
} = process.env;

const FIREBASE_CONFIG = JSON.parse(FIREBASE_CONFIG_TEXT ?? '{}');

const GOOGLE_CREDENTIALS = JSON.parse(GOOGLE_CREDENTIALS_TEXT ?? '{}');

export const { projectName, gcp, dockerRegistry } = constants;

export const gitlab = {
    ...constants.gitlab,
    token: GIT_TOKEN,
    user: GIT_USER ?? tryGetGitUserName(),
    email: GIT_EMAIL ?? tryGetGitUserEmail(),
    repositoryUrl: '',
    branch: '',
    branchSlug: tryGetGitBranchSlug(),
    commit: tryGetGitCommitHashShort()
};

export const npmRegistry = `//gitlab.com/api/v4/projects/${constants.gitlab.projectId}/packages/npm/`;

export const dockerRegistryRepository = `${constants.dockerRegistry}/${constants.projectName}/${constants.projectName}`;

export const digitaloceanToken = DIGITALOCEAN_TOKEN;

export const firebaseAppConfig = {
    projectId: FIREBASE_CONFIG?.projectId,
    apiKey: FIREBASE_CONFIG?.apiKey,
    authDomain: FIREBASE_CONFIG?.authDomain
};

export const firebaseAdminConfig = {
    projectId: GOOGLE_CREDENTIALS?.project_id,
    privateKey: GOOGLE_CREDENTIALS?.private_key,
    clientEmail: GOOGLE_CREDENTIALS?.client_email
};

export const postgresUser = POSTGRES_USER ?? defaults.postgresUser;

export const postgresPassword = POSTGRES_PASSWORD ?? defaults.postgresPassword;

export const postgresUri = POSTGRES_URI ?? defaults.postgresUri;

export const graphqlUri = GRAPHQL_URI ?? defaults.graphqlUri;

export const webClientUri = WEB_CLIENT_URI ?? defaults.webClientUri;

export const env = {
    GIT_USER: gitlab.user,
    GIT_EMAIL: gitlab.email,
    POSTGRES_URI: postgresUri,
    GRAPHQL_URI: graphqlUri,
    WEB_CLIENT_URI: webClientUri
};
