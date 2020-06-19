import React, { ReactElement } from 'react';
import { Link as MaterialLink } from '@material-ui/core';
import NextLink from 'next/link';

export interface LinkProps {
    href: string;
    as?: string;
    children: string | number | ReactElement | ReactElement[];
}

export const Link = ({ href, as, children }: LinkProps) => (
    <NextLink href={href} as={as} passHref>
        <MaterialLink>{children}</MaterialLink>
    </NextLink>
);
