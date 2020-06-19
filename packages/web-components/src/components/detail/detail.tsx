import React, { ReactElement } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

export interface DetailProps {
    id?: string;
    label: string | number | ReactElement;
    edit?: boolean;
    children: string | number | ReactElement | ReactElement[];
}

export const Detail = ({ id, label, children, edit }: DetailProps) => {
    const isReactElementChild = !!(children as ReactElement).type;
    return (
        <Grid item xs={12} sm={6} container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="caption">{label}</Typography>
            </Grid>
            <Grid item xs={6}>
                {edit && !isReactElementChild ? (
                    <TextField id={id} name={id} defaultValue={children} />
                ) : (
                    <Typography id={id} variant="body1">
                        {children}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};
