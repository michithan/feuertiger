import React, { ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
    children: ReactNode;
}

export default ({ children }: Props) => (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {children}
    </Typography>
);
