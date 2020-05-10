[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/feuertiger/feuertiger)

# Feuertiger

Feuertiger is an open source project to create a state-of-the-art platform for managing volunteer firefighting departments.

The main benefits of using Feuertiger should be:

- Easy adaption of real world paper forms into the digital world and vice versa using OCR and PDF export
- Easy hosting through straight forward infrastructure as code

## How to start

You can start coding simply using the gitpod integration.
To be able to run the Firebase service you need to set some secret environment variables.

```
gp env FIREBASE_SECRETS_TYPE=**********
gp env FIREBASE_SECRETS_PROJECT_ID=**********
gp env FIREBASE_SECRETS_PRIVATE_KEY_ID=**********
gp env FIREBASE_SECRETS_PRIVATE_KEY=**********
gp env FIREBASE_SECRETS_CLIENT_EMAIL=**********
gp env FIREBASE_SECRETS_CLIENT_ID=**********
gp env FIREBASE_SECRETS_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
gp env FIREBASE_SECRETS_TOKEN_URI="https://oauth2.googleapis.com/token"
gp env FIREBASE_SECRETS_AUTH_PROVIDER_X509_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
gp env FIREBASE_SECRETS_CLIENT_X509_CERT_URL=**********
gp env FIREBASE_SECRETS_APP_APIKEY=**********
gp env FIREBASE_SECRETS_APP_AUTHDOMAIN=**********
gp env FIREBASE_SECRETS_APP_DATABASEURL=**********
gp env FIREBASE_SECRETS_APP_STORAGEBUCKET=**********
gp env FIREBASE_SECRETS_APP_MESSAGINGSENDERID=**********
gp env FIREBASE_SECRETS_APP_APPID=**********
```

## Architecture

Feuertiger is build with a nodejs backend and a react webapp.
With this the howl application can run on any kind of serverless cloud functions, e.g. firebase-functions.
Thous making it extremely cheap to operate.

The git repo is set up as a mono-repository using Lena and GitHub npm package registry.

### Services

| Name          | Port | Description      | URL                             |
|---------------|------|------------------|---------------------------------|
| proxy-graphql | 4000 | graphql backend  | https://localhost:4000/graphiql |
| web-client    | 3000 | webclient server | https://localhost:3000/         |

### Packages

| Name                 | Description                             |
|----------------------|-----------------------------------------|
| orc                  | ocr tooling                             |
| schema-graphql       | backend api definiton source of truth   |
| tools                | monorepo dev tooling                    |
| utils-graphql        | tooling for graphql backend integration |
| data-access-friebase | tooling for firebase access             |

## Tech-stack

### Infrastructure

#### Firebase

### Backend

#### Prisma ORM

#### Graphql Apollo server

### Frontend

#### React nextjs

#### Material-UI

#### Styled-Components

#### Apollo client

