import admin from 'firebase-admin';
import { AuthenticationError } from 'apollo-server';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'test')
);

const persons = [
    {
        firstname: 'Max',
        lastname: 'Schmidt'
    }
];

export default async ({ req }: ExpressContext) => {
    // const token = req.headers.authorization || '';var session = driver.session({
    // var session = driver.session();
    // session.run(
    //     'MERGE (james:Person {name : $nameParam}) RETURN james.name AS name',
    //     {
    //         nameParam: 'James'
    //     }
    // );
    try {
        // const decodedToken = await admin.auth().verifyIdToken(token);
        return {
            user: {
                // uid: decodedToken.uid
            },
            driver
        };
    } catch (error) {
        throw new AuthenticationError('you must be logged in');
    }
};
