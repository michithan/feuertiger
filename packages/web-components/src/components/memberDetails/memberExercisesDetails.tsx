import React, { ReactElement } from 'react';
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

const handleSave = async (
    changes: Array<Exercise & Update>,
    props: MemberExercisesDetailsProps & ProviderContext
) => {
    const {
        updatePersonExercisesConnection,
        personId,
        enqueueSnackbar
    } = props;
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

const MemberExercisesDetailsWithSnackbar = ({
    exercisesParticipated,
    exercisesNotParticipated,
    ...props
}: MemberExercisesDetailsProps & ProviderContext): ReactElement => (
    <DetailEditTable
        label="Übungen"
        handleSave={(changes: Array<Exercise & Update>) =>
            handleSave(changes, props)
        }
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
                        href="/exercises/[id]"
                        as={`/exercises/${id}`}
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

export const MemberExercisesDetails = withSnackbar(
    MemberExercisesDetailsWithSnackbar
);
