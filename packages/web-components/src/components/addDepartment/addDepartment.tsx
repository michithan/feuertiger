import React, { ReactElement } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';

export interface AddDepartmentFormData {
    name: string;
    address: {
        city: string;
        street: string;
        streetNumber: string;
        postalCode: string;
        country: string;
    };
}

export interface AddDepartmentProps {
    handleSubmit: (data: AddDepartmentFormData) => void;
    initialValues: AddDepartmentFormData;
}

export const AddDepartment = ({
    handleSubmit,
    initialValues
}: AddDepartmentProps): ReactElement => {
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik<AddDepartmentFormData>({
        initialValues,
        onSubmit: values => {
            enqueueSnackbar('Saved!', { variant: 'success' });
            handleSubmit(values);
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography color="inherit" noWrap>
                        Feuerwehr Registrieren
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        label="Name der Feuerwehr"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={false} sm={6} />
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="address.city"
                        onChange={formik.handleChange}
                        value={formik.values.address.city}
                        label="Gemeinde"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="postalCode"
                        name="address.postalCode"
                        onChange={formik.handleChange}
                        value={formik.values.address.postalCode}
                        label="PLZ"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="street"
                        name="address.street"
                        onChange={formik.handleChange}
                        value={formik.values.address.street}
                        label="Straße"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="streetNumber"
                        name="address.streetNumber"
                        onChange={formik.handleChange}
                        value={formik.values.address.streetNumber}
                        label="Nummer"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button autoFocus color="primary" type="submit">
                        Übernehmen
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
