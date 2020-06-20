import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import {
    KeyboardDatePicker,
    KeyboardDatePickerProps
} from '@material-ui/pickers';
import { Field } from 'formik';

const FormikTextFieldWrapper = ({
    field,
    form,
    ...props
}: TextFieldProps & any) => <TextField {...field} {...props} />;

export const FormikTextField = (props: TextFieldProps) => (
    <Field {...props} component={FormikTextFieldWrapper} />
);

const FormikKeyboardDatePickerWrapper = ({
    field,
    form,
    ...props
}: KeyboardDatePickerProps & any) => (
    <KeyboardDatePicker {...field} {...props} />
);

export const FormikKeyboardDatePicker = (props: KeyboardDatePickerProps) => (
    <Field {...props} component={FormikKeyboardDatePickerWrapper} />
);
