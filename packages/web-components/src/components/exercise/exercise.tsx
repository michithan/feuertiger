import React from 'react';
import { Grid, Paper, Button, CircularProgress, Fab } from '@material-ui/core';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import { AllExercisesQueryResult } from '@feuertiger/schema-graphql';
import { AddExerciseComponent } from '../addExercise/addExerciseComponent';

interface State {
    addDialogOpen: boolean;
}

const ExerciseTable = ({
    exercise
}: {
    exercise: AllExercisesQueryResult['data']['allExercises'];
}) => {
    return (
        <MaterialTable
            options={{
                exportButton: true,
                filtering: true,
                grouping: true,
                search: true,
                sorting: true
            }}
            columns={[
                { title: 'Titel', field: 'topic' },
                { title: 'Datum', field: 'timeslot' },
                {
                    field: 'edit',
                    title: '',
                    filtering: false,
                    render: () => (
                        <Fab color="primary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                    )
                }
            ]}
            data={exercise}
            title="Übungen"
        />
    );
};

export interface ExerciseProps extends AllExercisesQueryResult {}

export class Exercise extends React.Component<ExerciseProps, State> {
    constructor(props: ExerciseProps) {
        super(props);
        this.state = {
            addDialogOpen: false
        };
    }

    handleOpenAddDialog = () => this.setState({ addDialogOpen: true });

    handleCloseAddDialog = () => this.setState({ addDialogOpen: false });

    render() {
        const { addDialogOpen } = this.state;
        const {
            error,
            loading,
            data: { allExercises }
        } = this.props;

        let content = null;

        if (loading) {
            content = <CircularProgress />;
        } else if (error) {
            content = <p>Error :(</p>;
        } else if (allExercises) {
            content = <ExerciseTable exercise={allExercises} />;
        }

        return (
            <>
                <AddExerciseComponent
                    open={addDialogOpen}
                    handleClose={this.handleCloseAddDialog}
                />
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Button
                            id="add-exercise-button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOpenAddDialog}
                        >
                            Übung hinzufügen
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
