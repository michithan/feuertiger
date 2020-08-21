import React from 'react';
import {
    PersonExercisesParticipatedFragment,
    PersonExercisesNotParticipatedFragment,
    Exercise,
    UpdatePersonExercisesConnectionMutationFn
} from '@feuertiger/schema-graphql';

import { withSnackbar, ProviderContext } from 'notistack';
import { DetailEditTable, Update, Link } from '../index';

export interface MemberExercisesDetailsProps
    extends PersonExercisesParticipatedFragment,
        PersonExercisesNotParticipatedFragment {
    personId: string;
    updatePersonExercisesConnection: UpdatePersonExercisesConnectionMutationFn;
}

interface State {}

class MemberExercisesDetailsWithSnackbar extends React.Component<
    MemberExercisesDetailsProps & ProviderContext,
    State
> {
    constructor(props: MemberExercisesDetailsProps & ProviderContext) {
        super(props);
        this.state = {};
    }

    private handleSave = async (changes: Array<Exercise & Update>) => {
        const {
            updatePersonExercisesConnection,
            personId,
            enqueueSnackbar
        } = this.props;
        try {
            await updatePersonExercisesConnection({
                variables: {
                    update: {
                        id: personId,
                        changes: changes.map(({ action, id }) => ({
                            action,
                            id
                        }))
                    }
                }
            });
            enqueueSnackbar('Änderungen übernommen.', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Fehler! ', {
                variant: 'error'
            });
        }
    };

    render() {
        const { exercisesParticipated, exercisesNotParticipated } = this.props;

        return (
            <DetailEditTable
                label="Übungen"
                handleSave={this.handleSave}
                connectionTableProps={{
                    columns: [
                        { title: 'Thema', field: 'topic' },
                        {
                            title: 'Datum',
                            field: 'timeslot.start',
                            type: 'datetime'
                        }
                    ]
                }}
                columns={[
                    {
                        title: 'Thema',
                        field: 'topic',
                        render: ({ id, topic }: Exercise) => (
                            <Link
                                href="/exercices/[id]"
                                as={`/exercices/${id}`}
                                inherit
                            >
                                {topic}
                            </Link>
                        )
                    },
                    {
                        title: 'Datum',
                        field: 'timeslot.start',
                        type: 'datetime'
                    }
                ]}
                title=""
                connectionData={exercisesNotParticipated}
                data={exercisesParticipated}
            />
        );
    }
}

export const MemberExercisesDetails = withSnackbar(
    MemberExercisesDetailsWithSnackbar
);
