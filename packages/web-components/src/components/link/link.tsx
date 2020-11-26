import React, { ReactElement } from 'react';
import { Link as MaterialLink } from '@material-ui/core';
import NextLink from 'next/link';
import { Variant } from '@material-ui/core/styles/createTypography';

export interface LinkProps {
    href?: string;
    as?: string;
    children: string | number | ReactElement | ReactElement[];
    inherit?: boolean;
    variant?: Variant;
}

export const Link = ({
    href,
    as,
    children,
    inherit,
    variant
}: LinkProps): ReactElement => (
    <NextLink href={href} as={as} passHref>
        <MaterialLink color={inherit ? 'inherit' : 'primary'} variant={variant}>
            {children}
        </MaterialLink>
    </NextLink>
);
