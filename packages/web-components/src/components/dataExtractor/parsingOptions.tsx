import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Switch
} from '@material-ui/core';
import type { ExtractorOptions } from './rawDataStructure';

export interface ParsingOptionsProps {
    options: ExtractorOptions;
}

export const ParsingOptions = (props: ParsingOptionsProps) => {
    const { options } = props;
    const { splitBySeparator } = options || {};
    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Parsing Options
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            required
                            id="colSeperator"
                            name="Cell Seperator"
                            label="Cell Seperator"
                            InputLabelProps={{
                                shrink: true
                            }}
                            variant="filled"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>Split rows by Seperator</Grid>
                        <Grid item>
                            <Switch
                                checked={splitBySeparator}
                                name="checkedC"
                            />
                        </Grid>
                        <Grid item>Split rows by length</Grid>
                    </Grid>
                    {splitBySeparator ? (
                        <Grid item xs={3}>
                            <TextField
                                required
                                id="rowSeprator"
                                name="Row Seperator"
                                label="Row Seperator"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="filled"
                            />
                        </Grid>
                    ) : (
                        <Grid item xs={3}>
                            <TextField
                                required
                                id="rowLength"
                                name="Row Length"
                                label="Row Length"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="filled"
                            />
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};
