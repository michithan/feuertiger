<p>
    <a href="https://gitlab.com/feuertiger/feuertiger/-/commits/dev">
        <img alt="pipeline status" src="https://gitlab.com/feuertiger/feuertiger/badges/dev/pipeline.svg" />
    </a>
    <a href="https://gitlab.com/feuertiger/feuertiger/-/commits/dev">
        <img alt="coverage report" src="https://gitlab.com/feuertiger/feuertiger/badges/dev/coverage.svg" />
    </a>
</p>

# Feuertiger

Feuertiger is an open source project to create a state-of-the-art platform for managing volunteer firefighting departments.

## How to start

You can start coding by simply using [Visual Studio Code Remote - Containers ](https://code.visualstudio.com/docs/remote/containers)

1. Install [docker desktop](https://docs.docker.com/desktop/)
2. Install VS Code extension [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
3. Open repository in container
4. To be able to run the Firebase service you need to set some secret environment variables.<br/>
   You can also get these secrets by creating your own [Firebase](https://firebase.google.com/) project

    ```
    export GOOGLE_CREDENTIALS=**********
    export FIREBASE_CONFIG=**********
    ```

5. Run services in dev mode
    ```
    feuertiger dev
    ```
6. Start coding
7. Login as feuertiger
    ```
    User: feuertiger@feuertiger.com
    Password: feuertiger
    ```

---

## Environment Variables

| Name                | Description                 | Stages                   |
| ------------------- | --------------------------- | ------------------------ |
| GOOGLE_CREDENTIALS  | firebase admin config       | develop, publish, deploy |
| FIREBASE_CONFIG     | firebase web config         | develop, dockerize       |
| DIGITALOCEAN_TOKEN  | digitalocean token          | infrastructure, deploy   |
| GIT_TOKEN           | git token                   | publish, deploy          |
| GIT_USER            | git user                    | publish, deploy          |
| PULUMI_ACCESS_TOKEN | pulumi cloud access token   | infrastructure, deploy   |

---

## Architecture

Feuertiger is build with a nodejs backend and a react webapp.
With this the howl application runs on a Kubernetes cluster setup with pulumi on digital ocean.
The git repo is set up as a mono-repository using Lerna, Gitlab npm package registry and Gitlab docker container registry.
All develop, test, build and deploy steps are implemented though the @feuertiger/cli interface.

### Services

| Name       | Description         | URL - local                     | URL - dev                          |
| ---------- | ------------------- | ------------------------------- | ---------------------------------- |
| storybook  | view web-components | https://localhost:5000/         | https://dev.feuertiger.com/        |
| graphql    | graphql backend     | https://localhost:4000/graphiql | https://dev.feuertiger.com/graphql |
| web-client | webclient server    | https://localhost:3000/         |                                    |

### Packages

| Name           | Description                                   |
| -------------- | --------------------------------------------- |
| orc            | ocr tooling                                   |
| migrations     | functions to apply migrations and seeding     |
| schema-graphql | backend api definiton source of truth         |
| schema-prisma  | database model definiton source of truth      |
| web-components | component and page library used by web-client |

---

## Tech-stack

### Languages

-   [Typescript](https://www.typescriptlang.org/docs/home)

### Infrastructure

#### Database

-   [Postgres](https://www.postgresql.org/)

#### Services

-   [Firebase Auth](https://firebase.google.com/)
-   [Digitalocean Managed Kubernetes Cluster](https://www.digitalocean.com/products/kubernetes/)
-   [Pulumi infrastructure as code](https://app.pulumi.com/)

### Backend

#### Data Access

-   [Prisma](https://www.prisma.io/docs/)

#### API

-   [Nodejs](https://nodejs.org/en/docs/)
-   [Graphql](https://graphql.org/learn/)
-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
-   [GraphQL code generator](https://graphql-code-generator.com/)

### Web-Frontend

#### Webclient Framework

-   [Nextjs](https://nextjs.org/)

#### Webclient Rendering

-   [React](https://reactjs.org/docs/getting-started.html)

#### CSS Rendering

-   [Styled-Components](https://styled-components.com/docs)

#### UI-Library

-   [Material-UI](https://material-ui.com/)

#### API-Client

-   [Apollo client](https://www.apollographql.com/docs/react/)
