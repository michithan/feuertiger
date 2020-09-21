import React, { ReactElement } from 'react';
import { Link as MaterialLink } from '@material-ui/core';
import NextLink from 'next/link';

export interface LinkProps {
    href: string;
    as?: string;
    children: string | number | ReactElement | ReactElement[];
    inherit?: boolean;
}

export const Link = ({
    href,
    as,
    children,
    inherit
}: LinkProps): ReactElement => (
    <NextLink href={href} as={as} passHref>
        <MaterialLink color={inherit ? 'inherit' : 'primary'}>
            {children}
        </MaterialLink>
    </NextLink>
);
