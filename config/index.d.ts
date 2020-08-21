export default interface Config {
    projectName: string;
    gitlab: {
        projectId: string;
        token: string;
        user: string;
        email: string;
        repositoryUrl: string;
        branchSlug: string;
        commit: string;
    };
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
    graphqlUri: string;
    webClientUri: string;
}
