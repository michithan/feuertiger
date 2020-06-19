import React, { ReactElement } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

export enum DetailType {
    Text,
    Date,
    Number,
    Component
}

export interface DetailProps {
    name: string;
    label: string | number | ReactElement;
    children: string | number | ReactElement | ReactElement[];
    type: DetailType;
    edit?: boolean;
}

export const Detail = ({ name, label, children, edit, type }: DetailProps) => {
    let content: ReactElement;
    if (edit) {
        switch (type) {
            case DetailType.Text:
                content = (
                    <TextField id={name} name={name} defaultValue={children} />
                );
                break;
            case DetailType.Number:
                content = (
                    <TextField id={name} name={name} defaultValue={children} />
                );
                break;
            case DetailType.Date:
                content = (
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id={name}
                        label={label}
                        value={children}
                        defaultValue={children}
                        onChange={() => {}}
                        KeyboardButtonProps={{
                            'aria-label': `Ändere ${label}`
                        }}
                    />
                );
                break;
            case DetailType.Component:
                content = children as ReactElement;
                break;
            default:
                break;
        }
    } else {
        switch (type) {
            case DetailType.Text:
                content = (
                    <Typography id={name} variant="body1">
                        {children}
                    </Typography>
                );
                break;
            case DetailType.Number:
                content = (
                    <Typography id={name} variant="body1">
                        {children}
                    </Typography>
                );
                break;
            case DetailType.Date:
                content = (
                    <Typography id={name} variant="body1">
                        {children}
                    </Typography>
                );
                break;
            case DetailType.Component:
                content = children as ReactElement;
                break;
            default:
                break;
        }
    }
    return (
        <Grid item xs={12} sm={6} container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="caption">{label}</Typography>
            </Grid>
            <Grid item xs={6}>
                {content}
            </Grid>
        </Grid>
    );
};
