import React, { ReactElement } from 'react';
import { CircularProgress } from '@material-ui/core';

export interface LoadingContainerrProps {
    loading: boolean;
    children: ReactElement;
}

export const LoadingContainer = ({
    loading,
    children
}: LoadingContainerrProps) => (loading ? <CircularProgress /> : children);
