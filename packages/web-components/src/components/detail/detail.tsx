import React, { ReactElement } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Button as MuiButton
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

export enum DetailType {
    Text,
    Date,
    Number,
    Button,
    Component
}

export interface DetailProps {
    name: string;
    label: string | number | ReactElement;
    children: string | number | ReactElement | ReactElement[];
    type: DetailType;
    edit?: boolean;
    handleClick?: (_: any) => void;
    handleChange?: (_: any) => void;
    handleBlur?: (_: any) => void;
    handleReset?: (_: any) => void;
}

export const Detail = ({
    name,
    label,
    children,
    edit,
    type,
    handleClick,
    handleChange,
    handleBlur,
    handleReset
}: DetailProps) => {
    let content: ReactElement;
    if (edit) {
        switch (type) {
            case DetailType.Text:
                content = (
                    <TextField
                        id={name}
                        name={name}
                        value={children}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onReset={handleReset}
                    />
                );
                break;
            case DetailType.Number:
                content = (
                    <TextField
                        id={name}
                        name={name}
                        value={children}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onReset={handleReset}
                    />
                );
                break;
            case DetailType.Date:
                content = (
                    <KeyboardDatePicker
                        variant="dialog"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id={name}
                        value={children}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onReset={handleReset}
                        KeyboardButtonProps={{
                            'aria-label': `Ändere ${label}`
                        }}
                    />
                );
                break;
            case DetailType.Component:
                content = children as ReactElement;
                break;
            case DetailType.Button:
                content = (
                    <MuiButton
                        onClick={handleClick}
                        color="primary"
                        aria-label="edit"
                    >
                        Bearbeiten
                    </MuiButton>
                );
                break;
            default:
                break;
        }
    } else {
        switch (type) {
            case DetailType.Text:
            case DetailType.Number:
            case DetailType.Button:
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
