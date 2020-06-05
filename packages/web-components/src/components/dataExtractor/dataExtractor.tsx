import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import {
    Grid,
    Table,
    TableContainer,
    TableBody,
    Paper,
    TableRow,
    TableCell,
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Switch
} from '@material-ui/core';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { RawDataStructure, ExtractorOptions } from './rawDataStructure';

export interface DataExtractorProps {}

interface State {
    file: File | null | undefined;
    data: RawDataStructure;
    options: ExtractorOptions;
}

const StyledBox = styled(Box)`
    padding-right: 24;
    font-family: 'Courier';
`;

export class DataExtractor extends React.Component<DataExtractorProps, State> {
    constructor(props: DataExtractorProps) {
        super(props);
        this.state = {
            file: null,
            data: null,
            options: {
                colSeperator: ';',
                rowSeprator: '\n',
                rowLength: null,
                splitBySeparator: true
            }
        };
    }

    handleChangeDropzone = async ([file]: File[]): Promise<void> => {
        if (file) {
            this.processRawData(file);
        }

        this.setState({
            file
        });
    };

    processRawData = async (file: File) => {
        const { options } = this.state;
        const dataStructure = new RawDataStructure(options);
        await dataStructure.parse(file);
        this.setState({ data: dataStructure });
    };

    render() {
        const {
            file,
            data,
            options: { splitBySeparator }
        } = this.state;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                File
                            </Typography>
                            {file ? (
                                <div>fileName: {file.name}</div>
                            ) : (
                                <DropzoneArea
                                    onChange={this.handleChangeDropzone}
                                    dropzoneText="Select File"
                                    acceptedFiles={['.csv', '.pdf']}
                                    fileObjects={[]}
                                    filesLimit={1}
                                />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Raw Data
                            </Typography>
                            {data ? (
                                <StyledBox component="div" display="block">
                                    {data.text}
                                </StyledBox>
                            ) : (
                                <>
                                    <Skeleton variant="text" height={30} />
                                    <Skeleton variant="text" height={30} />
                                    <Skeleton variant="text" height={30} />
                                    <Skeleton variant="text" height={30} />
                                    <Skeleton variant="text" height={30} />
                                    <Skeleton variant="text" height={30} />
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
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
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <TableContainer component={Paper}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    Flatt Table
                                </Typography>
                                {data ? (
                                    <Table
                                        size="small"
                                        aria-label="a dense table"
                                    >
                                        <TableBody>
                                            {data?.data.map((row, index) => (
                                                <TableRow key={`row_${index}`}>
                                                    {row.map((cell) => (
                                                        <TableCell align="right">
                                                            {cell}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <>
                                        <Skeleton variant="text" height={30} />
                                        <Skeleton variant="text" height={30} />
                                        <Skeleton variant="text" height={30} />
                                        <Skeleton variant="text" height={30} />
                                        <Skeleton variant="text" height={30} />
                                        <Skeleton variant="text" height={30} />
                                    </>
                                )}
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
