import React from 'react';
import {
    Table,
    TableContainer,
    TableBody,
    Paper,
    TableRow,
    TableCell,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { RawDataStructure } from './rawDataStructure';

export interface FlattData {
    dataStructure: RawDataStructure;
}

export const FlattData = (props: FlattData) => {
    const { dataStructure } = props;
    const { flattData } = dataStructure || {};
    return (
        <Card>
            <CardContent>
                <TableContainer component={Paper}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Flatt Table
                    </Typography>
                    {flattData ? (
                        <Table size="small" aria-label="a dense table">
                            <TableBody>
                                {flattData.map((row, index) => (
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
    );
};
