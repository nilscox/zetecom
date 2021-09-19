import styled from '@emotion/styled';

import { spacing } from '~/theme';

import { Box, BoxProps } from '../Box/Box';

type GridProps = BoxProps & {
  gap?: number;
};

export const Grid = styled(Box)<GridProps>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ gap }) => gap !== undefined && spacing(gap)};
`;
