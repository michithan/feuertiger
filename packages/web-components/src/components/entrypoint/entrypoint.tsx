import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import { Link, Paper } from '..';

const PointabelPaper = styled(Paper)`
    cursor: pointer;
    :hover {
        background-color: grey;
    }
`;

export interface EntrypointPageProps {
    firstname: string;
}

export const EntrypointPage = ({
    firstname
}: EntrypointPageProps): ReactElement => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper>{firstname ? `Hallo ${firstname}` : 'Hallo'}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Link href="/department/join">
                <PointabelPaper>Einer Feuerwehr beitreten</PointabelPaper>
            </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Link href="/department/register">
                <PointabelPaper>Eine Feuerwehr registrieren</PointabelPaper>
            </Link>
        </Grid>
    </Grid>
);
