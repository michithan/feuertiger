import React, { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export interface LoadingContainerrProps {
    loading: boolean;
    error?: Error;
    children: ReactElement;
}

export const LoadingContainer = ({
    loading,
    error,
    children
}: LoadingContainerrProps): ReactElement =>
    loading || error ? (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Skeleton variant="rect" height={25} />
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rect" height="calc(100vh - 180px)" />
            </Grid>
        </Grid>
    ) : (
        children
    );
