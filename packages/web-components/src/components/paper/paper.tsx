/* eslint-disable import/prefer-default-export */
import { Paper as MaterialPaper } from '@material-ui/core';
import styled from 'styled-components';

export const Paper = styled(MaterialPaper)`
    padding: ${({ theme }) => theme.spacing(3, 3)};
`;
