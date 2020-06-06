import React from 'react';
import { Paper, Card, CardContent, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { LazyLog } from 'react-lazylog';
import { RawDataStructure } from './rawDataStructure';

export interface RawTextProps {
    dataStructure: RawDataStructure;
}

export const RawText = (props: RawTextProps) => {
    const { dataStructure } = props;
    const { rawText } = dataStructure || {};
    return (
        <Card>
            <CardContent style={{ maxHeight: '30vh' }}>
                <Typography gutterBottom variant="h5" component="h2">
                    Raw Data
                </Typography>
                <Paper style={{ minHeight: '200px' }}>
                    {rawText ? (
                        <LazyLog
                            text={rawText}
                            selectableLines
                            style={{
                                borderRadius: '5px',
                                fontFamily: 'Courier'
                            }}
                        />
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
                </Paper>
            </CardContent>
        </Card>
    );
};
