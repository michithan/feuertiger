import React, { ReactElement } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Paper, EditButtonGroup } from '../index';

export interface DetailTableProps {
    label: string;
    children: ReactElement | ReactElement[];
    editMode?: boolean;
    dirty?: boolean;
    handleClickBack?: () => void;
    handleClickDiscard?: () => void;
    handleClickEdit?: () => void;
    handleClickSave?: () => void;
}

export const DetailTable = ({
    label,
    editMode,
    children,
    dirty,
    handleClickBack,
    handleClickDiscard,
    handleClickEdit,
    handleClickSave
}: DetailTableProps) => (
    <Paper>
        <Grid container spacing={3} justify="center">
            <Grid item xs={12} container justify="center">
                <Grid item xs={3} />
                <Grid item xs={6} container justify="center">
                    <Typography color="textPrimary" variant="h5" component="h5">
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={3} container justify="flex-end">
                    <EditButtonGroup
                        handleClickBack={handleClickBack}
                        handleClickDiscard={handleClickDiscard}
                        handleClickEdit={handleClickEdit}
                        handleClickSave={handleClickSave}
                        editMode={editMode}
                        dirty={dirty}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    </Paper>
);
