import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';
import { Field } from 'formik';

const FormikTextFieldWrapper = ({
    field,
    form,
    ...props
}: TextFieldProps & any) => <TextField {...field} {...props} />;

export const FormikTextField = (props: TextFieldProps) => (
    <Field {...props} component={FormikTextFieldWrapper} />
);

export const FormikDatePicker = ({
    label,
    name,
    ...props
}: Partial<DatePickerProps>) => (
    <Field
        {...props}
        label={label}
        name={name}
        component={({
            form: { setFieldValue, setFieldError, errors },
            field: { value }
        }) => (
            <DatePicker
                cancelLabel="Abbrechen"
                okLabel="Übernehmen"
                todayLabel="Heute"
                allowKeyboardControl
                showTodayButton
                format="dd.MM.yyyy"
                variant="dialog"
                {...props}
                label={label}
                name={name}
                helperText={errors[name]}
                error={Boolean(errors[name])}
                onChange={(fieldValue) =>
                    setFieldValue(name, fieldValue, false)
                }
                onError={(error) =>
                    error !== errors[name] && setFieldError(name, error)
                }
                value={value}
            />
        )}
    />
);
