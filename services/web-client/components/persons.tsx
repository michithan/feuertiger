import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const EXCHANGE_RATES = gql`
    {
        node(id: "Exercise:0") {
            id
            __typename
            ... on Exercise {
                topic
                timeslot {
                    start
                    end
                }
                leaders {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        node {
                            firstname
                            lastname
                        }
                    }
                }
                participants {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        node {
                            firstname
                            lastname
                        }
                    }
                }
            }
        }
    }
`;

const Persons = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.node.participants.edges.map(({ node }, i) => (
        <div key={i}>
            <p>firstname: {node.firstname}</p>
            <p>lastname: {node.lastname}</p>
        </div>
    ));
};

export default Persons;
