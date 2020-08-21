import React, { ReactElement } from 'react';
import { Grid, Typography, Button as MuiButton } from '@material-ui/core';
import format from 'date-fns/format';
import { FormikTextField, FormikDatePicker } from '../index';

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
    value?: string | number | Date;
    children?: ReactElement | ReactElement[];
    type: DetailType;
    edit?: boolean;
    handleClick?: (_: any) => void;
}

export const Detail = ({
    name,
    label,
    value,
    children,
    edit,
    type,
    handleClick
}: DetailProps) => {
    let content: ReactElement;
    if (edit) {
        switch (type) {
            case DetailType.Text:
                content = <FormikTextField id={`${name}Input`} name={name} />;
                break;
            case DetailType.Number:
                content = (
                    <FormikTextField
                        id={`${name}Input`}
                        name={name}
                        type="number"
                    />
                );
                break;
            case DetailType.Date:
                content = <FormikDatePicker id={`${name}Input`} name={name} />;
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
                content = (
                    <Typography id={name} variant="body1">
                        {value}
                    </Typography>
                );
                break;
            case DetailType.Date:
                content = (
                    <Typography id={name} variant="body1">
                        {format(value as Date, 'dd.MM.yyyy')}
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
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="caption">{label}</Typography>
            </Grid>
            <Grid item xs={6} container justify="flex-start">
                {content}
            </Grid>
        </Grid>
    );
};
