import React from 'react';
import { graphql, DataProps } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import { Grid, Paper, Button, CircularProgress, Fab } from '@material-ui/core';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import AddMember from './addMember';

interface State {
    addDialogOpen: boolean;
}

interface Data {
    loading: boolean;
    error: any;
    node: {
        participants: {
            edges: [
                {
                    node: {
                        firstname: string;
                        lastname: string;
                    };
                }
            ];
        };
    };
}

interface Props extends DataProps<Data> {}

const MemberTable = ({ member }) => {
    const participants = member.edges.map(({ node }) => node);
    return (
        <MaterialTable
            columns={[
                { title: 'Vorname', field: 'firstname' },
                { title: 'Nachname', field: 'lastname' },
                { title: 'Geburtsdatum', field: 'dateOfBirth' },
                { title: 'Eintrittsdatum ', field: 'dateOfEntry' },
                {
                    field: 'edit',
                    title: '',
                    render: rowData => (
                        <Fab color="primary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                    )
                }
            ]}
            data={participants}
            title="Mitglieder"
        />
    );
};

class Member extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            addDialogOpen: false
        };
    }

    handleOpenAddDialog = () => this.setState({ addDialogOpen: true });

    handleCloseAddDialog = () => this.setState({ addDialogOpen: false });

    render() {
        const { addDialogOpen } = this.state;
        const { data } = this.props;
        const { loading, error, node } = data || {};

        let content = null;

        if (loading) {
            content = <CircularProgress />;
        } else if (error) {
            content = <p>Error :(</p>;
        } else if (data) {
            content = <MemberTable member={node.participants} />;
        }

        return (
            <>
                <AddMember
                    open={addDialogOpen}
                    handleClose={this.handleCloseAddDialog}
                />
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOpenAddDialog}
                        >
                            Mitglied hinzufügen
                        </Button>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>{content}</Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default graphql(gql`
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
`)(Member);
