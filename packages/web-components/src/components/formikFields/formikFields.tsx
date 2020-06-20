import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';
import { Field, FieldProps } from 'formik';

const FormikTextFieldWrapper = ({
    field,
    form,
    ...props
}: TextFieldProps & any) => <TextField {...field} {...props} />;

export const FormikTextField = (props: TextFieldProps) => (
    <Field {...props} component={FormikTextFieldWrapper} />
);

const FormikDatePickerWrapper = ({
    form: { setFieldValue, setFieldError, errors },
    field: { name, value },
    ...other
}: Partial<DatePickerProps> & FieldProps<any>) => {
    const currentError = errors[name];
    return (
        <DatePicker
            cancelLabel="Abbrechen"
            okLabel="Übernehmen"
            todayLabel="Heute"
            allowKeyboardControl
            showTodayButton
            variant="dialog"
            name={name}
            value={value}
            format="dd.MM.yyyy"
            helperText={currentError}
            error={Boolean(currentError)}
            onError={(error: string) => {
                if (error && error !== currentError) {
                    setFieldError(name, error);
                }
            }}
            onChange={fieldValue => setFieldValue(name, fieldValue, false)}
            {...other}
        />
    );
};

export interface FormikDatePickerProps {
    name: string;
    label: string;
    disableFuture?: boolean;
    disablePast?: boolean;
}

export const FormikDatePicker = ({
    name,
    label,
    disableFuture,
    disablePast
}: Partial<DatePickerProps>) => (
    <Field
        name={name}
        label={label}
        disableFuture={disableFuture}
        disablePast={disablePast}
        component={FormikDatePickerWrapper}
    />
);
