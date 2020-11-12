import React, { ReactElement } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField
} from '@material-ui/core';
import { ExtractorOptions } from './rawDataStructure';

export interface ParsingOptionsProps {
    options: ExtractorOptions;
}

export const ParsingOptions = (props: ParsingOptionsProps): ReactElement => {
    const { options } = props;
    const { colSeparator, rowSeparator, rowLength } = options || {};
    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h6" component="h2">
                            Parsing Options
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            required={!rowLength}
                            id="rowSeparator"
                            name="Row Separator"
                            label="Row Separator"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                            value={rowSeparator}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            required={!rowSeparator}
                            id="rowLength"
                            type="number"
                            name="Row Length"
                            label="Row Length"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                            value={rowLength}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <TextField
                            required
                            id="colSeparator"
                            name="Cell Separator"
                            label="Cell Separator"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                            value={colSeparator}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
