import React, { ReactElement } from 'react';
import { LoadingSkeleton } from '../loadingSkeleton/loadingSkeleton';

export interface LoadingContainerrProps {
    loading: boolean;
    error?: Error;
    children: ReactElement;
}

export const LoadingContainer = ({
    loading,
    error,
    children
}: LoadingContainerrProps): ReactElement =>
    loading || error ? <LoadingSkeleton /> : children;
