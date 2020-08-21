import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Address } from '@feuertiger/schema-graphql';

import { Detail, DetailType, FormikTextField } from '../index';

export interface DetailAddressProps {
    namespace: string;
    address: Address;
    editMode: boolean;
}

export const DetailAddress = ({
    namespace,
    editMode,
    address: { postalCode, city, street, streetNumber }
}: DetailAddressProps) => (
    <Detail
        label="Adresse"
        edit={editMode}
        name={namespace}
        type={DetailType.Component}
    >
        {editMode ? (
            <Grid container>
                <Grid item xs={6}>
                    <FormikTextField
                        label="PLZ"
                        id={`${namespace}.postalCodeInput`}
                        name={`${namespace}.postalCode`}
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormikTextField
                        label="Ort"
                        id={`${namespace}.cityInput`}
                        name={`${namespace}.city`}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormikTextField
                        label="Straße"
                        id={`${namespace}.streetInput`}
                        name={`${namespace}.street`}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormikTextField
                        label="Nummer"
                        id={`${namespace}.streetNumberInput`}
                        name={`${namespace}.streetNumber`}
                    />
                </Grid>
            </Grid>
        ) : (
            <Typography id={namespace} variant="body1">
                {postalCode} {city}
                <br />
                {street} {streetNumber}
            </Typography>
        )}
    </Detail>
);
