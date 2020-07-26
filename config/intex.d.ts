export default interface Config {
    projectName: string;
    gitlab: {
        projectId: string;
        token: string;
        user: string;
    };
    gcp: {
        project: string;
        region: string;
        zone: string;
        accessToken: string;
    };
    digitaloceanToken: string;
    gitBranchSlug: string;
    gitCommitHashShort: string;
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
