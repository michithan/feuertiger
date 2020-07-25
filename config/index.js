const FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG);
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const { POSTGRES_URI, GRAPHQL_URI } = process.env;

exports.firebaseAppConfig = {
    projectId: FIREBASE_CONFIG.project_id,
    apiKey: FIREBASE_CONFIG.apiKey,
    authDomain: FIREBASE_CONFIG.authDomain
};

exports.firebaseAdminConfig = {
    projectId: GOOGLE_CREDENTIALS.project_id,
    privateKey: GOOGLE_CREDENTIALS.private_key,
    clientEmail: GOOGLE_CREDENTIALS.client_email
};

exports.postgresUri = POSTGRES_URI || 'localhost:5432';

exports.graphqlUri = GRAPHQL_URI || 'http://localhost:4000/';
