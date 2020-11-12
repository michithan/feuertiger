import React, { ReactElement } from 'react';
import { LoadingSkeleton } from '../loadingSkeleton/loadingSkeleton';

export interface LoadingContainerProps {
    loading: boolean;
    error?: Error;
    children: ReactElement;
}

export const LoadingContainer = ({
    loading,
    error,
    children
}: LoadingContainerProps): ReactElement =>
    loading || error ? <LoadingSkeleton /> : children;
