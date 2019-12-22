const fs = require('fs');
const path = require('path');

const trim = str => str && str.replace(/^"|"$/g, '');

const secrets = JSON.stringify(
    {
        type: trim(process.env.FIREBASE_SECRETS_TYPE),
        project_id: trim(process.env.FIREBASE_SECRETS_PROJECT_ID),
        private_key_id: trim(process.env.FIREBASE_SECRETS_PRIVATE_KEY_ID),
        private_key: trim(process.env.FIREBASE_SECRETS_PRIVATE_KEY),
        client_email: trim(process.env.FIREBASE_SECRETS_CLIENT_EMAIL),
        client_id: trim(process.env.FIREBASE_SECRETS_CLIENT_ID),
        auth_uri: trim(process.env.FIREBASE_SECRETS_AUTH_URI),
        token_uri: trim(process.env.FIREBASE_SECRETS_TOKEN_URI),
        auth_provider_x509_cert_url: trim(
            process.env.FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL
        ),
        client_x509_cert_url: trim(
            process.env.FIREBASE_SECRETS_CLIENT_X509_CERT_URL
        )
    },
    null,
    4
);

const secretsPath = path.resolve(__dirname, 'src', 'secrets.json');

fs.writeFileSync(secretsPath, secrets, 'utf8');
