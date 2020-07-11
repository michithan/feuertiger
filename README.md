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

The main benefits of using Feuertiger should be:

-   Easy adaption of real world paper forms into the digital world and vice versa using OCR and PDF export
-   Easy import and export functionality to existing solutions
-   Easy and cheap hosting through straight forward infrastructure as code

## How to start

You can start coding by simply using [Visual Studio Code Remote - Containers ](https://code.visualstudio.com/docs/remote/containers)

1. Install [docker desktop](https://docs.docker.com/desktop/)
2. Install VS Code extension [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
3. Open repository in container
4. To be able to run the Firebase service you need to set some secret environment variables.<br/>
   You can also get these secrets by creating your own [Firebase](https://firebase.google.com/) project

    ```
    export GOOGLE_CREDENTIALS=**********
    export DIGITALOCEAN_TOKEN=**********
    ```

5. Run services in dev mode
    ```
    yarn dev
    ```
6. Start coding
7. Login as Testuser
    ```
    User: feuertiger@feuertiger.com
    Password: feuertiger
    ```

---

## Architecture

Feuertiger is build with a nodejs backend and a react webapp.
With this the howl application can run on any kind of serverless cloud functions, e.g. firebase-functions.
Thous making it extremely cheap to operate.

The git repo is set up as a mono-repository using Lerna and Gitlab npm package registry.

### Services

| Name       | Description         | URL                             |
| ---------- | ------------------- | ------------------------------- |
| storybook  | view web-components | https://localhost:5000/         |
| graphql    | graphql backend     | https://localhost:4000/graphiql |
| web-client | webclient server    | https://localhost:3000/         |

### Packages

| Name           | Description                                   |
| -------------- | --------------------------------------------- |
| orc            | ocr tooling                                   |
| schema-graphql | backend api definiton source of truth         |
| schema-prisma  | persited data definiton source of truth       |
| web-components | component and page library used by web-client |

---

## Tech-stack

### Languages

-   [Typescript](https://www.typescriptlang.org/docs/home)

### Infrastructure

#### Database

-   [Postgre](https://www.postgresql.org/)

#### Services

-   [Firebase Auth](https://firebase.google.com/)
-   [Firebase Functions](https://firebase.google.com/)
-   Google Vision AI

### Backend

#### Data Access

-   [Prisma](https://www.prisma.io/docs/)

#### API

-   [Nodejs](https://nodejs.org/en/docs/)
-   [Graphql](https://graphql.org/learn/)
-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

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
